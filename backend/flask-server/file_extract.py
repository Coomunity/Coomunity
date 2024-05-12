import ast
import astor
import re

def extract_recursive_functions(file_path):

    with open(file_path, 'r', encoding='utf-8') as file:
        code = file.read()

        module = ast.parse(code)

        recursive_functions = set()

        # 함수 호출을 처리하는 함수
        def visit_Call(node):
            # 호출된 함수의 이름이 현재 노드의 이름과 같은지 확인하고, 맞다면 집합에 추가.
            if isinstance(node.func, ast.Name) and node.func.id == current_function_name:
                recursive_functions.add(astor.to_source(current_function_node))

        # 특정 함수에서 자기 자신을 호출하는지 확인하는 함수
        def visit_FunctionDef(node):
            global current_function_name, current_function_node
            current_function_name = node.name
            current_function_node = node
            # 함수 안에서 노드를 순회하면서
            for item in ast.walk(node):
                # 호출된 함수를 처리.
                if isinstance(item, ast.Call):
                    visit_Call(item)

        # AST를 순회하면서 함수를 찾고, 찾은 함수에 대해 visit_FunctionDef 함수를 호출.
        for node in ast.walk(module):
            if isinstance(node, ast.FunctionDef):
                visit_FunctionDef(node)


        return recursive_functions

#=======================================
# 파일 하나에 재귀 함수들을 한번에 저장하기
# def save_functions_to_txt_2(recursive_functions, txt_file):

#     # 텍스트 파일에 찾은 재귀 함수를 저장.
#     # with open(txt_file, 'w') as file:
#     #     for function in recursive_functions:
#     #         file.write(function + '\n\n')

#     file_path_py = f"entire_recursive_functions.py"

#     with open(file_path_py, 'w') as file_py_2:
#         for function in recursive_functions:
#             file_py_2.write(function + '\n\n')
#========================================
   
   
# 파일 하나에 재귀함수 하나씩 저장하기
def save_functions_to_txt(recursive_functions, txt_file):
    # 숫자 추가를 위한 초기값 설정
    file_number = 1



    #file_name = txt_file.split('.')[0]


    # 텍스트 파일에 찾은 재귀 함수를 저장.
    for function in recursive_functions:
        #print(function)
        match = re.search(r'def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(', function)
        function_name = match.group(1)
        file_function_name = 'recursiveFunction_'+function_name

        #file_path = f"{file_function_name}_{file_number}.txt"
        file_path_text = f"{file_function_name}.txt"

        file_path_py = f"{file_function_name}.py"

        # 해당 파일에 재귀 함수를 저장.
        with open(file_path_text, 'w') as file_text:
            file_text.write(function + '\n\n')

        with open(file_path_py, 'w') as file_py:
            file_py.write(function)



        file_number += 1


def extract_files(filepath):

    python_file_path = filepath

    txt_file_path = 'recursive_function_extracted_code.txt'

    found_recursive_functions = extract_recursive_functions(python_file_path)
    save_functions_to_txt(found_recursive_functions, txt_file_path)

    #save_functions_to_txt_2(found_recursive_functions, txt_file_path)

