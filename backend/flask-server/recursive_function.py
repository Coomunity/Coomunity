from PIL import Image, ImageDraw, ImageFont
import re
import entire_recursive_functions
import os
from pathlib import Path


def adjust_text_to_fit_box(draw, text, box_width, box_height):
    font_size = 10  # 초기 폰트 크기
    font = ImageFont.truetype("backend/flask-server/arial.ttf", font_size)

    # 텍스트 크기 계산
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

    # 상자 크기에 맞게 텍스트 크기가 조절될 때까지 반복
    while text_width > box_width or text_height > box_height:
        font_size -= 1
        font = ImageFont.truetype("backend/flask-server/arial.ttf", font_size)
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

    font_size +=2
    font= ImageFont.truetype("backend/flask-server/arial.ttf", font_size)
    return font


#=========================

def replace_whole_word(original_string, target_word, replacement):
    pattern = r'\b' + re.escape(target_word) + r'\b'
    # re.sub()을 사용하여 해당 패턴을 치환
    modified_string = re.sub(pattern, replacement, original_string)
    return modified_string

def read_text_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content

def find_first_argument_name(file_content):
    # 함수 정의 내에서 첫 번째로 나오는 argument 찾기
    function_pattern = r"def\s+[a-zA-Z_][a-zA-Z0-9_]*\((\w+)"
    match = re.search(function_pattern, file_content)

    if match:
        return match.group(1)
    else:
        return None


def find_argument_in_text(file_path, argument):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    for line in lines:

        if 'return' in line:
            return_value = line.split('return', 1)[1].strip()

            # 반환 값에 argument 포함 여부 확인
            if argument in return_value:
                return return_value

    return None


def calRecursiveNum(file_path,num):
    argument=find_first_argument_name(read_text_file(file_path))
    result=find_argument_in_text(file_path,argument)
    #print(result)
    if result:
        text=replace_whole_word(result,argument,num)

       # print(text)

        pattern = r'\((.*?)\)'
        matches = re.findall(pattern, text)
        count = 0
        matches_real = []
        if matches:

            for matches_test in matches:
                matches_real.append(matches_test)
                #print(matches_real[count])
                #print(eval(matches_real[count]))
                #print(replace_whole_word(text,matches_real[count],str(eval(matches_real[count]))))
                text=replace_whole_word(text,matches_real[count],str(eval(matches_real[count])))
                count += 1
            return text
        else:
            print("수식을 찾지 못함")
            return None

    else:
        print("해당 함수에서 해당하는 반환 값을 찾을 수 없음")
        return None



# def newFunction(n):
#     if n <= 1:
#         return 1
#     else:
#         return n * newFunction(n - 1)
#
#
# def get_recursive_text(num):
#     if num <= 1:
#         return "1"
#     else:
#         return f"{num}*newFunction({num - 1})"

def get_image_size(num_boxes):
    box_size = int(50 * 1.3)
    enlarged_box_size = box_size * 2
    gap = 25
    total_height = enlarged_box_size * num_boxes + gap * (num_boxes - 1)
    total_width = enlarged_box_size * num_boxes + gap * (num_boxes - 1)
    return max(2000, total_width), max(1800, total_height)

def draw_connected_boxes(num_boxes, file_path, line_num):
    width, height = get_image_size(num_boxes)
    background_color = (255, 255, 255)
    box_size = int(50 * 1.3)
    enlarged_box_size = box_size * 2
    gap = 25
    starting_x = (width - enlarged_box_size * num_boxes - gap * (num_boxes - 1)) // 2
    starting_y = (height - enlarged_box_size * num_boxes - gap * (num_boxes - 1)) // 2
    image = Image.new("RGB", (width, height), background_color)
    draw = ImageDraw.Draw(image)

    with open(file_path, 'r', encoding='utf-8') as file:
        code = file.read()

    match = re.search(r'def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(', code)
    function_name = match.group(1)
    func = getattr(entire_recursive_functions, function_name)

    for i in range(num_boxes):
        num = num_boxes - i
        box_x1 = starting_x + i * (enlarged_box_size + gap)
        box_y1 = starting_y + i * (enlarged_box_size + gap)
        box_x2 = box_x1 + enlarged_box_size
        box_y2 = box_y1 + enlarged_box_size

        box_color = "red" if i == 0 else "black"
        draw.rectangle([box_x1, box_y1, box_x2, box_y2], outline=box_color, width=5)

        font_size = 12
        font = ImageFont.truetype("backend/flask-server/arial.ttf", font_size * 2)

        #font2 = ImageFont.truetype("arial.ttf", int(enlarged_box_size * 0.135))


        #recursive_text = get_recursive_text(num)

        recursive_text = calRecursiveNum(file_path,str(num))

        font2 = adjust_text_to_fit_box(draw, f"{function_name}({num})", enlarged_box_size, enlarged_box_size)

        try:
            text_bbox = draw.textbbox((0, 0), recursive_text, font=font)
            text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

            if i != num_boxes - 1:
                box_text = f"{function_name}({num})"
                text_bbox = draw.textbbox((0, 0), box_text, font=font)
                text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
                draw.text(((box_x1 + box_x2 - text_width) // 2 + 100, (box_y1 + box_y2) // 2 - font_size + 10), box_text, fill="black", font=font2, anchor="mm")
                draw.text((box_x2 + gap * 4 + 25, (box_y1 + box_y2 + text_height) // 2 + 10), '= '+str(func(num)), fill="black", font=font, anchor="lt")
                draw.text((box_x2 + gap * 4 + 25, (box_y1 + box_y2 - text_height) // 2), recursive_text, fill="black",font=font, anchor="lt")
            else:
                box_text = f"{function_name}({num})"
                text_bbox = draw.textbbox((0, 0), box_text, font=font)
                text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
                draw.text(((box_x1 + box_x2 - text_width) // 2 + 100, (box_y1 + box_y2) // 2 - font_size + 10), box_text, fill="black", font=font2, anchor="mm")
                draw.text(((box_x1 + box_x2 - text_width) // 2 + 85, (box_y1 + box_y2 + text_height) // 2 + 10),'= '+ str(func(num)), fill="black", font=font, anchor="lt")

        except Exception as e:
            print(f"오류 발생: {e}")

        if i < num_boxes - 1:
            next_box_x1 = starting_x + (i + 1) * (enlarged_box_size + gap)
            next_box_y1 = starting_y + (i + 1) * (enlarged_box_size + gap)

            draw.line([(box_x1 + enlarged_box_size // 2, box_y2), (next_box_x1 + enlarged_box_size // 2 - 60, next_box_y1)], fill="blue", width=5)  # 왼쪽으로 10만큼 이동

            arrow_width = 15
            arrow_points = [
                (next_box_x1 + enlarged_box_size // 2 - 85, next_box_y1-20),
                (next_box_x1 + enlarged_box_size // 2 + arrow_width - 70, next_box_y1),
                (next_box_x1 + enlarged_box_size // 2 - 90, next_box_y1 - arrow_width + 20)
            ]
            draw.polygon(arrow_points, fill="blue")

            draw.line([(box_x2, (box_y1 + box_y2) // 2), (box_x2 + gap + enlarged_box_size // 2, (box_y1 + box_y2) // 2)], fill="green", width=5)
            draw.line([(box_x2 + gap + enlarged_box_size // 2, (box_y1 + box_y2) // 2), 65+next_box_x1 + enlarged_box_size // 2, next_box_y1], fill="green", width=5)

            new_arrow_points = [
                (box_x2, (box_y1 + box_y2) // 2),
                (box_x2 + arrow_width, (box_y1 + box_y2) // 2 - arrow_width),
                (box_x2 + arrow_width, (box_y1 + box_y2) // 2 + arrow_width)
            ]
            draw.polygon(new_arrow_points, fill="green")
    filename = str(line_num) + '.png'
    path_to_file = Path('coomunity-app/public/code_images') / filename

    image.save(path_to_file)


def recursive_function_image(num,filename,line_num):
    draw_connected_boxes(num, filename,line_num)

# num_boxes = 3
#right_value = newFunction(num_boxes)
# draw_connected_boxes(num_boxes, 'recursiveFunction_newFunction.txt')
