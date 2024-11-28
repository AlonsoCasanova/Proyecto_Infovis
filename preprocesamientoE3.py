import pandas as pd

datos = pd.read_csv("datos.csv")

def extract_numeric(value):
    num = ""
    for v in value:
        if v in "1234567890.":
            num += v
    return float(num)

def consumo_por_seg(tpo_uso, gasto_por_uso):   
    if "hora" in tpo_uso:
        tpo_uso = extract_numeric(tpo_uso)
        tiempo_uso_promedio_segundos = tpo_uso * 60 * 60
    elif "minuto" in tpo_uso:
        tpo_uso = extract_numeric(tpo_uso)
        tiempo_uso_promedio_segundos = tpo_uso * 60
    elif "continuo" in tpo_uso:
        tiempo_uso_promedio_segundos = 1 * 30 * 24 * 60 * 60    # No hay datos en más de un mes

    consumo_segundo = gasto_por_uso / tiempo_uso_promedio_segundos
    
    return consumo_segundo

def consumo_por_min(tpo_uso, gasto_por_uso):   
    if "hora" in tpo_uso:
        tpo_uso = extract_numeric(tpo_uso)
        tiempo_uso_promedio_min = tpo_uso * 60
    elif "minuto" in tpo_uso:
        tpo_uso = extract_numeric(tpo_uso)
        tiempo_uso_promedio_min = tpo_uso
    elif "continuo" in tpo_uso:
        tiempo_uso_promedio_min = 1 * 30 * 24 * 60   # No hay datos en más de un mes

    consumo_min = gasto_por_uso / tiempo_uso_promedio_min
    
    return consumo_min

datos['Consumo_por_segundo'] = datos.apply(
    lambda row: consumo_por_seg(row['Tiempo_Uso_unitario'], row['Gasto_por_uso(pesos)']),
    axis=1
)

datos['Consumo_por_minuto'] = datos.apply(
    lambda row: consumo_por_min(row['Tiempo_Uso_unitario'], row['Gasto_por_uso(pesos)']),
    axis=1
)

