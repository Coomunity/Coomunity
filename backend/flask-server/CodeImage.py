import ast
import re
import os
import array_image
import recursive_function
import file_extract
import class_image
import time
import threading
import asyncio

async def extract_files_async(filename):
    file_name = filename
    file_extract.extract_files(file_name)

def extract_names_from_files(directory):
    names = []
    for filename in os.listdir(directory):
        if filename.startswith("recursiveFunction_") and filename.endswith(".txt"):

            name = filename.split("_")[1].split(".")[0]
            names.append(name)
    return names

def parse_array_indices_from_file(file_path):
    results = []

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

        for line_number, line in enumerate(lines, start=1):
            pattern = r'(\w+)\[(\d+)\]\[(\d+)\]\s?=\s?(\d+)'
            matches = re.finditer(pattern, line)

            for match in matches:
                array_name = match.group(1)
                index_1 = int(match.group(2))
                index_2 = int(match.group(3))
                value = int(match.group(4))

                results.append({
                    'array_name': array_name,
                    'index_1': index_1,
                    'index_2': index_2,
                    'value': value,
                    'line_number': line_number
                })

    return results

def find_class_variable_info(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        in_class_definition = False
        class_name = None
        class_variable_name = None
        instance_variable_names = []
        # constructor_values = None
        constructor_values = []

        line_number=0

        for line in file:
            line_number+=1
            if line.startswith('class '):
                class_name = line.split(' ')[1].split(':')[0]
                in_class_definition = True
            elif in_class_definition:
                if 'def __init__' in line:

                    # 클래스의 __init__ 메서드를 찾음
                    instance_variable_line = next(file)  # 다음 줄로 넘어감
                    line_number+=1
                    while 'self.' in instance_variable_line:
                        variable_name = instance_variable_line.split('=')[0].split('self.')[1].strip()
                        instance_variable_names.append(variable_name)
                        instance_variable_line = next(file)  # 다음 줄로 넘어감
                        line_number += 1

                if '=' in line and class_name in line:
                    # 클래스 변수 선언 부분 발견

                    parts = line.split(' = ')
                    class_variable_name = parts[0].strip()
                    constructor_values.append(parts[1].split(f'{class_name}(')[1].split(')')[0].strip())
                    cleaned_data = constructor_values[0].replace('"', '').split(',')
                    line_number_of_condition=line_number
                    #instance_variable_names = [v.strip().strip('"') for v in constructor_values.split(',')]
                    break

        if in_class_definition == False:
            return 404            

        result = {
            "class_name": class_name,
            "class_variable_name": class_variable_name,
            "instance_variable_names": instance_variable_names,
            "constructor_values": cleaned_data,
            "line_number" : line_number_of_condition
        }

        return result


print('=============================================================')

def find_function_calls(file_path, function_name):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    function_calls = []

    pattern = r'\b' + re.escape(function_name) + r'\([^)]*\)'
    inside_function = False

    for idx, line in enumerate(lines, start=1):
        if line.strip().startswith('def '):
            inside_function = True
            continue

        if inside_function or line.strip().startswith('return '):

            inside_function = False
            continue

        matches = re.findall(pattern, line)
        for match in matches:
            function_calls.append((match.strip(), idx))

    return function_calls

def assign_1d_to_2d(filename):
    assignments_1d_to_2d = {}
    line_numbers_1d_to_2d = {}

    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        line_counter = 0

        for line in lines:
            line = line.strip()
            line_counter += 1

            if '=' in line and not line.startswith('#'):
                var_name, values = [part.strip() for part in line.split('=')]
                try:

                    not_pattern = r'(\w+\[\d+\]\[\d+\]) = (\w+\[\d+\])\[\d+\]'
                    not_matches = re.search(not_pattern, line)

                    if not_matches:
                        continue

                    # 기존의 정규 표현식에서 array2_var에 해당하는 부분을 \[\d+\] 패턴으로 수정하여 2차원 배열을 필터링.
                    pattern = r'(\w+\[\d+\]\[\d+\]) = (\w+\[\d+\])'
                    matches = re.search(pattern, line)

                    if matches:
                        array2_var, array1_var = matches.groups()

                        # 이 부분에서 array2_var의 패턴이 2차원 배열이 아닌 1차원 배열로 들어가도록 조건 추가.
                        if '[' not in array2_var.split('[')[0]:  # 2차원 배열이 아닌 경우에만 처리
                            assignment_info = {
                                'source': f"{array1_var}",
                                'destination': f"{array2_var}",
                                'line': line_counter
                            }

                            if array2_var in assignments_1d_to_2d:
                                assignments_1d_to_2d[array2_var].append(assignment_info)
                            else:
                                assignments_1d_to_2d[array2_var] = [assignment_info]

                            source_element_with_index = f"{array1_var}"
                            if source_element_with_index in line_numbers_1d_to_2d:
                                line_numbers_1d_to_2d[source_element_with_index].append(line_counter)
                            else:
                                line_numbers_1d_to_2d[source_element_with_index] = [line_counter]

                except Exception as e:
                    print(f"Error: {e} at line {line_counter} - {line}")

    return assignments_1d_to_2d, line_numbers_1d_to_2d

def assign_2d_to_1d(filename):
    assignments_2d_to_1d = {}
    line_numbers_2d_to_1d = {}

    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        line_counter = 0

        for line in lines:
            line = line.strip()
            line_counter += 1

            if '=' in line and not line.startswith('#'):
                var_name, values = [part.strip() for part in line.split('=')]
                try:
                    pattern = r'(\w+\[\d+\]) = (\w+\[\d+\]\[\d+\])'
                    matches = re.search(pattern, line)

                    if matches:
                        array1_var, array2_var = matches.groups()

                        assignment_info = {
                            'source': f"{array2_var}",
                            'destination': f"{array1_var}",
                            'line': line_counter
                        }

                        if array1_var in assignments_2d_to_1d:
                            assignments_2d_to_1d[array1_var].append(assignment_info)
                        else:
                            assignments_2d_to_1d[array1_var] = [assignment_info]

                        source_element_with_index = f"{array2_var}"

                        # Keep track of line numbers
                        if source_element_with_index in line_numbers_2d_to_1d:

                            line_numbers_2d_to_1d[source_element_with_index].append(line_counter)
                        else:
                            line_numbers_2d_to_1d[source_element_with_index] = [line_counter]

                except Exception as e:
                    print(f"Error: {e} at line {line_counter} - {line}")

    return assignments_2d_to_1d, line_numbers_2d_to_1d

def array_value_array_2d(filename):
    array_data_transfer_2d = {}
    line_numbers_data_transfer_2d = {}

    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        line_counter = 0

        for line in lines:
            line = line.strip()
            line_counter += 1

            if '=' in line and not line.startswith('#'):
                var_name, values = [part.strip() for part in line.split('=')]
                try:
                    pattern = r'(\w+\[\d+\]\[\d+\]) = (\w+\[\d+\]\[\d+\])'
                    matches = re.search(pattern, line)

                    if matches:
                        array1_var, array2_var = matches.groups()

                        transfer_info = {
                            'source': f"{array2_var}",
                            'destination': f"{array1_var}",
                            'line': line_counter
                        }

                        if array1_var in array_data_transfer_2d:
                            array_data_transfer_2d[array1_var].append(transfer_info)
                        else:
                            array_data_transfer_2d[array1_var] = [transfer_info]

                        source_element_with_index = f"{array2_var}"
                        if source_element_with_index in line_numbers_data_transfer_2d:
                            line_numbers_data_transfer_2d[source_element_with_index].append(line_counter)
                        else:
                            line_numbers_data_transfer_2d[source_element_with_index] = [line_counter]

                except Exception as e:
                    print(f"Error: {e} at line {line_counter} - {line}")

    return array_data_transfer_2d, line_numbers_data_transfer_2d

def array_value_array(filename):
    arrays_1d = {}
    arrays_2d = {}
    array_assignments = {}
    class_variables = []
    line_numbers_1d = {}
    line_numbers_2d = {}
    line_numbers_assignments = {}
    array_data_transfer = {}
    line_numbers_data_transfer = {}
    var_name2 = []

    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        line_counter = 0
        inside_class = False

        for line in lines:
            line = line.strip()
            line_counter += 1

            if line.startswith('class'):
                inside_class = True
                class_variables.append(line)
            elif line.startswith('def') and inside_class:
                inside_class = False

            # 배열 선언 및 배열 요소 할당 부분 모두 확인
            if '=' in line and not inside_class:
                var_name, values = [part.strip() for part in line.split('=')]
                # print(var_name)
                # print(values)
                try:
                    # print(var_name)
                    # 배열 요소 할당인지 확인하는 정규 표현식
                    pattern = r'(\w+)\[(\d+)\] = (\w+)\[(\d+)\]'
                    matches = re.search(pattern, line)

                    if matches:
                        # 배열 요소 할당이라면 추출한 값으로 처리.
                        array_name = matches.group(1)
                        array_index = matches.group(2)
                        value_name = matches.group(3)
                        value_index = matches.group(4)

                        assigned_value = {value_name: value_index}
                        index = int(array_index)

                        if array_name in array_assignments:
                            if index in array_assignments[array_name]:
                                array_assignments[array_name][index].append(
                                    {'value': assigned_value, 'line': line_counter})
                            else:
                                array_assignments[array_name][index] = [{'value': assigned_value, 'line': line_counter}]
                        else:
                            array_assignments[array_name] = {index: [{'value': assigned_value, 'line': line_counter}]}

                        # 줄 번호 정보 추가
                        array_element_with_index = f"{array_name}[{index}]"
                        if array_element_with_index in line_numbers_assignments:
                            line_numbers_assignments[array_element_with_index].append(line_counter)
                        else:
                            line_numbers_assignments[array_element_with_index] = [line_counter]

                            # print(line)
                            # 배열 간 데이터 이동 부분을 확인.
                            if '[' in line and ']' in line and '=' in line and line.count('[') >= 2 and line.count(
                                    ']') >= 2:
                                # print(line)
                                try:
                                    source, destination = [part.strip() for part in line.split('=')]
                                    # print(source)
                                    source_var, source_index = [part.strip() for part in source.split('[')]
                                    source_index = source_index.split(']')[0]
                                    destination_var, destination_index = [part.strip() for part in
                                                                          destination.split('[')]
                                    destination_index = destination_index.split(']')[0]

                                    transfer_info = {
                                        'source': f"{source_var}[{source_index}]",
                                        'destination': f"{destination_var}[{destination_index}]",
                                        'line': line_counter
                                    }

                                    if source_var in array_data_transfer:
                                        array_data_transfer[source_var].append(transfer_info)
                                    else:
                                        array_data_transfer[source_var] = [transfer_info]

                                    source_element_with_index = f"{source_var}[{source_index}]"
                                    if source_element_with_index in line_numbers_data_transfer:
                                        line_numbers_data_transfer[source_element_with_index].append(line_counter)
                                    else:
                                        line_numbers_data_transfer[source_element_with_index] = [line_counter]

                                except Exception as e:
                                    pass

                except Exception as e:
                    print(f"Error: {e} at line {line_counter} - {line}")
    return array_data_transfer, line_numbers_data_transfer

def extract_arrays_and_classes(filename):
    arrays_1d = {}
    arrays_2d = {}
    array_assignments = {}
    class_variables = []
    line_numbers_1d = {}
    line_numbers_2d = {}
    line_numbers_assignments = {}
    array_data_transfer = {}
    line_numbers_data_transfer = {}
    var_name2=[]

    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        line_counter = 0
        inside_class = False

        for line in lines:
            line = line.strip()
            line_counter += 1

            if line.startswith('class'):
                inside_class = True
                class_variables.append(line)
            elif line.startswith('def') and inside_class:
                inside_class = False

            # 배열 선언 및 배열 요소 할당 부분 모두 확인
            if '=' in line and not inside_class:
                var_name, values = [part.strip() for part in line.split('=')]
                # print(var_name)
                #print(values)
                try:
                    #print(var_name)
                    if '[' in var_name or f"{var_name}[" in values:

                        array_name, indices = var_name.split('[')
                        index = indices.split(']')[0]
                        try:
                            assigned_value = ast.literal_eval(values)
                            #print(values)
                            if array_name in array_assignments:
                                if index in array_assignments[array_name]:
                                    array_assignments[array_name][index].append({'value': assigned_value, 'line': line_counter})
                                else:
                                    array_assignments[array_name][index] = [{'value': assigned_value, 'line': line_counter}]
                            else:
                                array_assignments[array_name] = {index: [{'value': assigned_value, 'line': line_counter}]}

                            # 줄 번호 정보 추가
                            array_element_with_index = f"{array_name}[{index}]"
                            if array_element_with_index in line_numbers_assignments:
                                line_numbers_assignments[array_element_with_index].append(line_counter)
                            else:
                                line_numbers_assignments[array_element_with_index] = [line_counter]
                            #print(line)
                            # 배열 간 데이터 이동 부분을 확인.
                            if '[' in line and ']' in line and '=' in line and line.count('[') >= 2 and line.count(']') >= 2:
                                #print(line)
                                try:
                                    source, destination = [part.strip() for part in line.split('=')]
                                    #print(source)
                                    source_var, source_index = [part.strip() for part in source.split('[')]
                                    source_index = source_index.split(']')[0]
                                    destination_var, destination_index = [part.strip() for part in destination.split('[')]
                                    destination_index = destination_index.split(']')[0]

                                    transfer_info = {
                                        'source': f"{source_var}[{source_index}]",
                                        'destination': f"{destination_var}[{destination_index}]",
                                        'line': line_counter
                                    }

                                    if source_var in array_data_transfer:
                                        array_data_transfer[source_var].append(transfer_info)
                                    else:
                                        array_data_transfer[source_var] = [transfer_info]

                                    source_element_with_index = f"{source_var}[{source_index}]"
                                    if source_element_with_index in line_numbers_data_transfer:
                                        line_numbers_data_transfer[source_element_with_index].append(line_counter)
                                    else:
                                        line_numbers_data_transfer[source_element_with_index] = [line_counter]

                                except Exception as e:
                                    print(f"Error: {e} at line {line_counter} - {line}")

                        except Exception as e:
                           pass
                    #====================================================================================
                    elements = ast.literal_eval(values)

                    if isinstance(elements, list):
                        if any(isinstance(el, list) for el in elements):
                            arrays_2d[var_name] = elements
                            line_numbers_2d[var_name] = line_counter
                        else:
                            arrays_1d[var_name] = elements
                            line_numbers_1d[var_name] = line_counter

                except Exception as e:
                    pass


    return arrays_1d, arrays_2d, class_variables, line_numbers_1d, line_numbers_2d, array_assignments, line_numbers_assignments

async def main():
    # 테스트 코드로 넣어두셨던것 리액트에서 넘어오는 코드파일로 경로 바꾸어두었습니다. 우선 코드 내용은 기존의 코드로 넣었습니다.
    print(os.getcwd())
    filename = 'backend/flask-server/saved_text.txt'
    arrays_1d_dict, arrays_2d_dict, class_variables, line_numbers_1d, line_numbers_2d, array_assignments, line_numbers_assignments = extract_arrays_and_classes(
        filename)

    array_data_transfer, line_numbers_data_transfer = array_value_array(filename)

    array_data_transfer_2d, line_numbers_data_transfer_2d = array_value_array_2d(filename)

    array_data_1d_to_2d, line_numbers_1d_to_2d = assign_1d_to_2d(filename)

    array_data_2d_to_1d, line_numbers_2d_to_1d = assign_2d_to_1d(filename)

    parsed_data = parse_array_indices_from_file(filename)

    all_array_data = {

    }

    task1 = asyncio.create_task(extract_files_async(filename))
    await task1
    # file_extract.extract_files(filename)

    # 이미지 저장 폴더
    folder_name = 'coomunity-app/public/code_images'

    if not os.path.exists(folder_name):
        os.mkdir(folder_name)
        print(f'폴더 "{folder_name}"가 생성')
    else:
        print(f'폴더 "{folder_name}"는 이미 존재')
        current_directory = os.path.dirname(os.path.abspath(__file__))
        folder_path = os.path.join(current_directory, folder_name)
        files = os.listdir('coomunity-app/public/code_images')
        for file in files:
            if file.endswith('.png'):
                file_path = os.path.join(folder_path, file)
                os.remove(file_path)
                print(f'{file} 파일을 삭제.')

    print("\n\n1차원 배열:")
    for var_name, values in arrays_1d_dict.items():
        print(f"{var_name}: {values}, 선언된 줄 번호: {line_numbers_1d[var_name]}")
        all_array_data[var_name] = values
        array_image.one_array_image(1, var_name, values, line_numbers_1d[var_name])

    print("\n2차원 배열:")
    for var_name, values in arrays_2d_dict.items():
        print(f"{var_name}: {values}, 선언된 줄 번호: {line_numbers_2d[var_name]}")
        all_array_data[var_name] = values
        array_image.one_array_image(2, var_name, values, line_numbers_2d[var_name])

    print("\n클래스 변수:")
    for var in class_variables:
        print(var)

    first_num = []
    first_name = []
    second_num = []
    second_name = []
    first_second_line = []

    first_second_count = 0
    print("1차원 배열 데이터 할당:")
    for array_element, indices in array_assignments.items():
        for index, values_and_lines in indices.items():
            for value_and_line in values_and_lines:
                value = value_and_line['value']
                lines = value_and_line['line']

                array_element_with_index = f"{array_element}[{index}]"
                line_info = line_numbers_assignments.get(array_element_with_index)

                if line_info is not None:
                    if isinstance(lines, list):  # 줄 번호가 리스트인 경우
                        print(f"{array_element} {index}: {value}, 할당된 줄 번호: {', '.join(map(str, lines))}")

                    else:  # 리스트가 아닌 경우 단일 값으로 출력
                        print(f"{array_element} {index}: {value}, 할당된 줄 번호: {lines}")
                        first_num.append(1)
                        first_name.append(array_element + '[' + index + ']')
                        second_num.append(0)
                        second_name.append(value)
                        first_second_line.append(lines)
                        first_second_count += 1
                else:
                    print(f"No line number information for {array_element}")

    print('\n\n')
    print('2차원 배열 데이터 할당')
    for data in parsed_data:
        print(
            f"배열 이름: {data['array_name']}, 인덱스 1: {data['index_1']}, 인덱스 2: {data['index_2']}, 값: {data['value']}, 줄 번호: {data['line_number']}")
        first_num.append(2)
        first_name.append(data['array_name'] + '[' + str(data['index_1']) + ']' + '[' + str(data['index_2']) + ']')
        second_num.append(0)
        second_name.append(data['value'])
        first_second_line.append(data['line_number'])
        first_second_count += 1

    print('\n\n')
    print("1차원 배열 간 데이터 이동:")
    for source_var, transfer_infos in array_data_transfer.items():
        for transfer_info in transfer_infos:
            source = transfer_info['source']
            destination = transfer_info['destination']
            lines = transfer_info['line']

            line_info = line_numbers_data_transfer.get(source)

            if line_info is not None:
                if isinstance(lines, list):
                    print(f"{destination} -> {source}, 데이터 이동 라인 번호: {', '.join(map(str, lines))}")
                else:
                    print(f"{destination} -> {source}, 데이터 이동 라인 번호: {lines}")
                    first_num.append(1)
                    first_name.append(source)
                    second_num.append(1)
                    second_name.append(destination)
                    first_second_line.append(lines)
                    first_second_count += 1
            else:
                print(f"No line number information for {source}")

    print('\n')

    print("2차원 배열 간 데이터 이동:")
    for source_var, transfer_infos in array_data_transfer_2d.items():
        for transfer_info in transfer_infos:
            source = transfer_info['source']
            destination = transfer_info['destination']
            lines = transfer_info['line']

            line_info = line_numbers_data_transfer_2d.get(source)

            if line_info is not None:
                if isinstance(lines, list):
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {', '.join(map(str, lines))}")
                else:
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {lines}")
                    first_num.append(2)
                    first_name.append(destination)
                    second_num.append(2)
                    second_name.append(source)
                    first_second_line.append(lines)
                    first_second_count += 1
            else:
                print(f"No line number information for {source}")

    print('\n')

    print("1차원 배열 -> 2차원 배열 데이터 이동:")
    for source_var, transfer_infos in array_data_1d_to_2d.items():
        for transfer_info in transfer_infos:
            source = transfer_info['source']
            destination = transfer_info['destination']
            lines = transfer_info['line']

            line_info = line_numbers_1d_to_2d.get(source)

            if line_info is not None:
                if isinstance(lines, list):
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {', '.join(map(str, lines))}")
                else:
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {lines}")
                    first_num.append(2)
                    first_name.append(destination)
                    second_num.append(1)
                    second_name.append(source)
                    first_second_line.append(lines)
                    first_second_count += 1
            else:
                print(f"No line number information for {source}")

    print('\n')
    print("2차원 배열 -> 1차원 배열 데이터 이동:")
    for source_var, transfer_infos in array_data_2d_to_1d.items():
        for transfer_info in transfer_infos:
            source = transfer_info['source']
            destination = transfer_info['destination']
            lines = transfer_info['line']

            line_info = line_numbers_2d_to_1d.get(source)

            if line_info is not None:
                if isinstance(lines, list):
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {', '.join(map(str, lines))}")
                else:
                    print(f"{source} -> {destination}, 데이터 이동 라인 번호: {lines}")
                    first_num.append(1)
                    first_name.append(destination)
                    second_num.append(2)
                    second_name.append(source)
                    first_second_line.append(lines)
                    first_second_count += 1
            else:
                print(f"No line number information for {source}")

    # 라인 별 배열 순서 정렬
    array_len = len(first_num)

    for i in range(array_len):
        for j in range(0, array_len - i - 1):
            if first_second_line[j] > first_second_line[j + 1]:
                first_second_line[j], first_second_line[j + 1] = first_second_line[j + 1], first_second_line[j]
                first_num[j], first_num[j + 1] = first_num[j + 1], first_num[j]
                first_name[j], first_name[j + 1] = first_name[j + 1], first_name[j]
                second_num[j], second_num[j + 1] = second_num[j + 1], second_num[j]
                second_name[j], second_name[j + 1] = second_name[j + 1], second_name[j]

    # 배열 데이터 저장 및 이미지 생성
    for i in range(array_len):

        if first_num[i] == 1:

            if second_num[i] == 0:

                first_column = int(re.search(r'\[(\d+)\]', first_name[i]).group(1))
                first_array = all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]
                first_array[first_column] = int(second_name[i])
                # print(all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)])
                # re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1) 랑 all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)] 랑 first_second_line[i] 넘기기
                array_image.one_array_image(1, re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)],
                                            first_second_line[i])

            elif second_num[i] == 1:

                first_column = int(re.search(r'\[(\d+)\]', first_name[i]).group(1))
                first_array = all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]
                second_column = int(re.search(r'\[(\d+)\]', second_name[i]).group(1))
                second_array = all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)]
                first_array[first_column] = second_array[second_column]
                # print(all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)])
                # re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1) / all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]
                # re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1) / all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)]
                # first_second_line[i]

                array_image.two_array_image(1, re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)], 0,
                                            first_column, 1, re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)], 0,
                                            second_column, first_second_line[i])
            elif second_num[i] == 2:

                first_column = int(re.search(r'\[(\d+)\]', first_name[i]).group(1))
                first_array = all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]

                second_match = re.match(r'(\w+)\[\d+\]', second_name[i])
                second_array = all_array_data[second_match.group(1)]
                second_row = int(re.findall(r'\[(\d+)\]', second_name[i])[0])
                second_column = int(re.findall(r'\[(\d+)\]', second_name[i])[1])

                first_array[first_column] = second_array[second_row][second_column]
                array_image.two_array_image(1, re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)], 0,
                                            first_column, 2, second_match.group(1), second_array, second_row,
                                            second_column, first_second_line[i])
                # print(all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)])
                # re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1) / all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]
                # second_match.group(1) / second_array
                # first_second_line[i]

        elif first_num[i] == 2:

            if second_num[i] == 0:

                first_match = re.match(r'(\w+)\[\d+\]', first_name[i])
                first_array = all_array_data[first_match.group(1)]
                first_row = int(re.findall(r'\[(\d+)\]', first_name[i])[0])
                first_column = int(re.findall(r'\[(\d+)\]', first_name[i])[1])
                first_array[first_row][first_column] = int(second_name[i])
                array_image.one_array_image(2, first_match.group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)],
                                            first_second_line[i])

                # print(all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)])
                # first_match.group(1) / all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)]/ first_second_line[i]

            elif second_num[i] == 1:

                first_match = re.match(r'(\w+)\[\d+\]', first_name[i])
                first_array = all_array_data[first_match.group(1)]
                first_row = int(re.findall(r'\[(\d+)\]', first_name[i])[0])
                first_column = int(re.findall(r'\[(\d+)\]', first_name[i])[1])

                second_column = int(re.search(r'\[(\d+)\]', second_name[i]).group(1))
                second_array = all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)]
                first_array[first_row][first_column] = second_array[second_column]
                array_image.two_array_image(2, first_match.group(1), all_array_data[first_match.group(1)], first_row,
                                            first_column, 1, re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1),
                                            all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)], 0,
                                            second_column, first_second_line[i])
                # print(all_array_data[re.search(r'([^\[]+)\[\d+\]', first_name[i]).group(1)])
                # first_match.group(1) / all_array_data[first_match.group(1)]
                # re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1) / all_array_data[re.search(r'([^\[]+)\[\d+\]', second_name[i]).group(1)]
                # first_second_line[i]
            elif second_num[i] == 2:

                first_match = re.match(r'(\w+)\[\d+\]', first_name[i])
                first_array = all_array_data[first_match.group(1)]
                first_row = int(re.findall(r'\[(\d+)\]', first_name[i])[0])
                first_column = int(re.findall(r'\[(\d+)\]', first_name[i])[1])

                second_match = re.match(r'(\w+)\[\d+\]', second_name[i])
                second_array = all_array_data[second_match.group(1)]
                second_row = re.findall(r'\[(\d+)\]', second_name[i])[0]
                second_column = re.findall(r'\[(\d+)\]', second_name[i])[1]

                first_array[first_row][first_column] = second_array[int(second_row)][int(second_column)]

                array_image.two_array_image(2, first_match.group(1), all_array_data[first_match.group(1)], first_row,
                                            first_column, 2, second_match.group(1), second_array, int(second_row),
                                            int(second_column), first_second_line[i])
                # print(all_array_data[first_match.group(1)])
                # first_match.group(1) / all_array_data[first_match.group(1)]
                # second_match.group(1) / second_array
                # first_second_line[i]
        print(i)
        print("============================================================================")
        for key, value in all_array_data.items():
            print(f"Key: {key}, Value: {value}")

    print('\n 재귀 함수')
    current_directory = os.getcwd()

    names_list = extract_names_from_files(current_directory)

    for fun_name in names_list:
        calls = find_function_calls(filename, fun_name)

        for call, line_number in calls:
            print(f"Function call '{call}' found on line {line_number}")
            fun_match = re.match(r'([^()]+)\(([^()]+)\)', call)
            string_part = fun_match.group(1)  # 문자열 부분
            value_part = fun_match.group(2)  # 값 부분
            print("문자열 부분:", string_part)
            print("값 부분:", value_part)
            file_name = 'recursiveFunction_' + fun_name + '.txt'
            recursive_function.recursive_function_image(int(value_part), file_name, line_number)

    print('\n 클래스')
    class_info = find_class_variable_info(filename)
    if class_info != 404:
        for key, value in class_info.items():
            if value:
                print(f"{key.replace('_', ' ').title()}: {value}")
                class_image.class_images(class_info['class_name'], class_info['class_variable_name'],
                                         class_info['instance_variable_names'], class_info['constructor_values'],
                                         class_info['line_number'])

asyncio.run(main())