from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
from scipy.integrate import solve_ivp

# Modelo y parámetros
mumax = 0.093
ks1 = 2.5
kn1 = 0.01
Y_XS = 0.44
Y_XN = 4
alfa = 0.468
beta = 0.019

T_min = 20  
T_max = 32  
T_opt = 25  
pH_min = 4
pH_max = 8
pH_opt = 7.0 

class SimulationView(APIView):
    def post(self, request):
        data = request.data
        X0 = data.get('biomasa')
        S_C0 = data.get('sustrato')
        S_N0 = data.get('nitrogeno')
        P0 = 0
        time_total = data.get('tiempo')
        Temp = data.get('temperatura')
        pH = data.get('pH')

        if None in [X0, S_C0, S_N0, time_total, Temp, pH]:
            return Response({'error': 'Missing or invalid input parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        def efect_temp_pH(v):
            T, pH = v  
            Temp_effect = ((T - T_max) * ((T - T_min)**2)) / ((T_opt - T_min) * ((T_opt - T_min) * (T - T_opt) - (T_opt - T_max) * (T_opt + T_min - 2*T)))    
            pH_effect = ((pH - pH_min) * (pH - pH_max)) / ((pH - pH_min) * (pH - pH_max) - ((pH - pH_opt)**2))
            return Temp_effect, pH_effect

        def EDO(t, y, v):
            X, S_C, S_N, P = y
            Temp_effect, pH_effect = efect_temp_pH(v)
            mu = mumax * (S_C / (ks1 + S_C)) * (S_N / (kn1 + S_N)) * Temp_effect * pH_effect
            dXdt = mu * X
            dS_Cdt = -dXdt / Y_XS
            dS_Ndt = -dXdt / Y_XN
            dPdt = alfa * dXdt + beta * X
            return [dXdt, dS_Cdt, dS_Ndt, dPdt]

        V = [Temp, pH]
        y0 = [X0, S_C0, S_N0, P0]
        t_span = (0, time_total)
        t_eval = np.linspace(*t_span, 100)

        solution = solve_ivp(EDO, t_span, y0, args=(V,), t_eval=t_eval)

        # Extract variables into arrays for JSON
        result = {
            "tiempo": solution.t.tolist(),
            "biomasa": solution.y[0].tolist(),
            "sustrato": solution.y[1].tolist(),
            "nitrogeno": solution.y[2].tolist(),
            "producto": solution.y[3].tolist(),
            "temperatura": [Temp] * len(solution.t),
            "pH": [pH] * len(solution.t),
        }

        return Response(result, status=status.HTTP_200_OK)
