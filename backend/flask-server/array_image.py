import numpy as np
import pandas as pd
from PIL import Image, ImageDraw

import dataframe_image as dfi
import os
from pathlib import Path

# 화살표 그리기
def draw_arrowed_line(draw, point1, point2, arrow_length=15, arrow_width=7, color='red', width=2):
    # 두 점 사이의 거리 계산
    dx = point2[0] - point1[0]
    dy = point2[1] - point1[1]
    distance = (dx**2 + dy**2)**0.5

    # 선분 그리기
    draw.line([point1, point2], fill=color, width=width)

    # 화살표 그리기
    if distance > arrow_length:
        arrow_head = (point1[0] + arrow_length*dx/distance, point1[1] + arrow_length*dy/distance)
        draw.polygon([point1, (arrow_head[0] - arrow_width*dy/distance, arrow_head[1] + arrow_width*dx/distance),
                      (arrow_head[0] + arrow_width*dy/distance, arrow_head[1] - arrow_width*dx/distance)], fill=color)

# 배열을 선으로 연결
def draw_connected_arrays(df1, df2, index1_row, index1_col, index2_row, index2_col, image_path):
    # 표 크기 설정
    cell_width = 50
    cell_height = 30
    gap = 90  # 표 간격
    table_width = cell_width * (df1.shape[1] + df2.shape[1] + 1) + gap
    table_height = cell_height * max(df1.shape[0], df2.shape[0])

    # 이미지 생성
    image_width = table_width
    image_height = table_height + 50
    image = Image.new('RGB', (image_width, image_height), color='white')
    draw = ImageDraw.Draw(image)

    # 왼쪽에 인덱스 칸 그리기 (첫 번째 배열)
    for i, _ in enumerate(df1.index):
        cell_left = 0
        cell_top = (i + 1) * cell_height
        cell_right = cell_width
        cell_bottom = (i + 2) * cell_height
        cell_value = str(i)

        draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='blue')
        draw.text((cell_left + 5, cell_top + 5), cell_value, fill='blue')

    # 왼쪽에 인덱스 칸 그리기 (두 번째 배열)
    for i, _ in enumerate(df2.index):
        cell_left = df1.shape[1] * cell_width + gap
        cell_top = (i + 1) * cell_height
        cell_right = df1.shape[1] * cell_width + cell_width + gap
        cell_bottom = (i + 2) * cell_height
        cell_value = str(i)

        draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='blue')
        draw.text((cell_left + 5, cell_top + 5), cell_value, fill='blue')

    # 위쪽에 인덱스 칸 그리기 (첫 번째 배열)
    for j, _ in enumerate(df1.columns):
        cell_left = (j + 1) * cell_width
        cell_top = 0
        cell_right = (j + 2) * cell_width
        cell_bottom = cell_height
        cell_value = str(j)

        draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='blue')
        draw.text((cell_left + 5, cell_top + 5), cell_value, fill='blue')

    # 위쪽에 인덱스 칸 그리기 (두 번째 배열)
    for j, _ in enumerate(df2.columns):
        cell_left = (j + df1.shape[1] + 1) * cell_width + gap
        cell_top = 0
        cell_right = (j + df1.shape[1] + 2) * cell_width + gap
        cell_bottom = cell_height
        cell_value = str(j)

        draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='blue')
        draw.text((cell_left + 5, cell_top + 5), cell_value, fill='blue')

    # 첫 번째 배열 그리기
    for i, row in enumerate(df1.values):
        for j, value in enumerate(row):
            cell_left = (j + 1) * cell_width
            cell_top = (i + 1) * cell_height
            cell_right = (j + 2) * cell_width
            cell_bottom = (i + 2) * cell_height
            cell_value = str(value)

            if i == index1_row and j == index1_col:
                draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='red')
                draw.text((cell_left + 5, cell_top + 5), cell_value, fill='red')
            else:
                draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='black')
                draw.text((cell_left + 5, cell_top + 5), cell_value, fill='black')

    # 두 번째 배열 그리기
    for i, row in enumerate(df2.values):
        for j, value in enumerate(row):
            cell_left = (j + df1.shape[1] + 1) * cell_width + gap
            cell_top = (i + 1) * cell_height
            cell_right = (j + df1.shape[1] + 2) * cell_width + gap
            cell_bottom = (i + 2) * cell_height
            cell_value = str(value)

            if i == index2_row and j == index2_col:
                draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='red')
                draw.text((cell_left + 5, cell_top + 5), cell_value, fill='red')
            else:
                draw.rectangle([(cell_left, cell_top), (cell_right, cell_bottom)], outline='black')
                draw.text((cell_left + 5, cell_top + 5), cell_value, fill='black')

    # 선택한 부분 연결하는 선 그리기
    point1 = ((index1_col + 1.5) * cell_width, (index1_row + 1.5) * cell_height)
    point2 = ((index2_col + df1.shape[1] + 1.5) * cell_width + gap, (index2_row + 1.5) * cell_height)

    draw_arrowed_line(draw, point1, point2, color='red', width=2)

    # 이미지 저장
    image.save(image_path)



#==========================================================================================

def save_table_as_image(df, filename):

    styles = [
        dict(selector="th:nth-child(2), td:nth-child(2)", props=[("border-left", "1px solid black")]),
        dict(selector="th:not(:first-child):not(:nth-child(2)), td:not(:first-child):not(:nth-child(2))", props=[("border-top", "unset"), ("border-left", "unset")])
    ]
    df_styled = df.style.set_table_styles(styles)

    # 이미지로 저장
    dfi.export(df_styled, filename)



def one_array_image(num, name, value, line_num ):
    df = pd.DataFrame(value)

    if num == 1:
        df = df.transpose()

    filename = str(line_num)+'.png'
    path_to_file = Path('coomunity-app/public/code_images') / filename
    save_table_as_image(df, path_to_file)

def two_array_image(first_num,first_name,first_value,first_row,first_column,second_num,second_name,second_value,second_row,second_column,line_num):
    df = pd.DataFrame(first_value)
    df_2 = pd.DataFrame(second_value)

    filename = str(line_num) + '.png'
    path_to_file = Path('coomunity-app/public/code_images') / filename

    if first_num == 1:
        if second_num == 1:
            df = df.transpose()
            df_2 = df_2.transpose()
            draw_connected_arrays(df, df_2, 0, first_column, 0, second_column, path_to_file)

        elif second_num == 2:
            df=df.transpose()
            draw_connected_arrays(df, df_2, 0, first_column, second_row, second_column, path_to_file)

    elif first_num == 2:
        if second_num == 1 :
            df_2 = df_2.transpose()
            draw_connected_arrays(df, df_2, first_row, first_column, 0, second_column, path_to_file)

        elif second_num ==2:

            draw_connected_arrays(df, df_2, first_row, first_column, second_row, second_column, path_to_file)



