from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
from scipy.integrate import solve_ivp

# Parámetros del modelo
mumax = 0.093 # Tasa de crecimiento máxima (h-1)
ks1 = 2.5 # Constante de saturación del sustrato (kg/m3)
kn1 = 0.01 # Constante de saturación del nitrógeno (kg/m3)
Y_XS = 0.44 # Rendimiento de biomasa sobre sustrato (kg/kg)
Y_XN = 4    # Rendimiento de biomasa sobre nitrógeno (kg/kg)
alfa = 0.468 # Rendimiento de producto sobre biomasa (kg/kg)
beta = 0.019 # Rendimiento de producto sobre sustrato (kg/kg)
P0 = 0  # Concentración inicial de producto (kg/m3)

# Temperatura y pH
T_min = 20  
T_max = 32  
T_opt = 25  
pH_min = 4
pH_max = 8
pH_opt = 7.0 

class SimulationView(APIView):
    def post(self, request):
        data = request.data
        # Extract parameters from the request
        X0 = data.get('biomasa')
        S_C0 = data.get('sustrato')
        S_N0 = data.get('nitrogeno')
        P0 = 0  # Assuming initial product concentration is 0
        time_total = data.get('time')
        Temp = data.get('temperature')
        pH = data.get('pH')

        # Validate inputs
        if None in [X0, S_C0, S_N0, time_total, Temp, pH]:
            return Response({'error': 'Invalid input parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        # Define your model parameters and functions here
        # For brevity, using placeholder functions

        # Evento para detener integracion cuando S_C < 1
        def event_substrate(t, y, *args):
                return y[1] - 1.0
        
        event_substrate.terminal = True
        event_substrate.direction = -1
            
        def efect_temp_pH(v):
            T, pH = v  
            Temp_effect = ((T - T_max) * ((T - T_min)**2)) / ((T_opt - T_min) * ((T_opt - T_min) * (T - T_opt) - (T_opt - T_max) * (T_opt + T_min - 2*T)))    
            pH_effect = ((pH - pH_min) * (pH - pH_max)) / ((pH - pH_min) * (pH - pH_max) - ((pH - pH_opt)**2))
            return Temp_effect, pH_effect

        def EDO(t, y):
            X, S_C, S_N, P = y
            Temp_effect, pH_effect = efect_temp_pH(V)
            mu = mumax * (S_C / (2.5 + S_C)) * (S_N / (0.01 + S_N)) * Temp_effect * pH_effect
            dXdt = mu * X
            dS_Cdt = -dXdt / 0.44
            dS_Ndt = -dXdt / 4
            dPdt = 0.468 * dXdt + 0.019 * X
            return [dXdt, dS_Cdt, dS_Ndt, dPdt]

        y0 = [X0, S_C0, S_N0, P0]
        V = [Temp, pH]
        t_span = (0, time_total)
        t_eval = np.linspace(t_span[0], t_span[1], 100)
        solution = solve_ivp(EDO, t_span, y0, args=(V),t_eval=t_eval, method='RK45')

        # Calcular la tasa de crecimiento μ
        S_C_array = solution.y[1]
        S_N_array = solution.y[2]
        Temp_effect, pH_effect = efect_temp_pH(V)
        mu_array = mumax * (S_C_array / (ks1 + S_C_array)) * (S_N_array / (kn1 + S_N_array)) * Temp_effect * pH_effect

        # Prepare the response data
        response_data = []
        for i in range(len(solution.t)):
            response_data.append({
                'time': solution.t[i],
                'biomasa': solution.y[0][i],
                'sustrato': solution.y[1][i],
                'nitrogeno': solution.y[2][i],
                'producto': solution.y[3][i],
                'temperature': Temp,
                'pH': pH
            })

        return Response(response_data, status=status.HTTP_200_OK)
