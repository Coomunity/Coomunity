from flask import Flask, request, jsonify, json, session
import os
import sys
from io import StringIO
import openai
from flask_cors import CORS
import DBRequest
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
# async def wait():
#     test.extract_files('backend/flask-server/saved_text.txt')

@app.route('/ide', methods=['POST'])
def index():
    #HTTP 리퀘스트가 POST인지 확인
    request.method == 'POST'
    #HTTP POST 요청에서의 입력값 가져오기
    input = request.get_json()['input']

    #파일 입출력 경로 설정(이 파이썬 코드가 있는 위치로) (saved_text -> html에서 입력된 문자열을 저장) (result_text -> 문자열을 코드로 돌린 결과값(문자열) 저장)
    filepath_savedtxt = os.path.join(os.path.dirname(__file__), 'saved_text.txt')
    filepath_resulttxt = os.path.join(os.path.dirname(__file__), 'result_text.txt')

    #표준 출력 스트림을 문자열 버퍼로 설정
    sys.stdout = StringIO()

    #saved_text에 html에서 가져온 문자열 저장
    with open(filepath_savedtxt, 'w') as f_s:
        f_s.write(input)
    with open(filepath_savedtxt, 'r') as f_s:
        #code 변수에 문자열 저장
        code = f_s.read()
 
    try:
        with open(filepath_resulttxt, 'w') as f_r:
            # string으로 가져온 파이썬 코드 실행
            globals_dict = globals()
            exec(code, globals_dict)
            # 실행 결과를 변경된 출력장치로 전달(result_text.txt 파일)
            f_r.write(sys.stdout.getvalue())
            #표준 출력장치 원상복구
            sys.stdout = sys.__stdout__

    #예외처리
    except Exception as e:
        #표준 출력장치 원상복구
        with open(filepath_resulttxt, 'w') as f_r:
            f_r.write(str(e))
            sys.stdout = sys.__stdout__

    with open(filepath_resulttxt, 'r') as f_s:
        #code 변수에 문자열 저장
        result = f_s.readlines()
    
    return result

@app.route('/add_comment', methods=['POST'])
def add_comment():
    current_directory = os.path.dirname(os.path.abspath(__file__))

    def generate_code_comments(code):
        load_dotenv()
        openai.api_key = os.getenv('Chat_GPT')

        # 주어진 코드를 각 라인으로 분할
        code_lines = code.split('\n')

        # 주석을 저장할 리스트를 초기화
        comments_list = []
        
        # 각 라인에 대해 주석을 생성
        for line in code_lines:
            # GPT 프롬프트
            prompts = f"Add comments in korean to the following Python code:\n\n{line}\n\nComment:"

            response = openai.completions.create(

                model="gpt-3.5-turbo-instruct",
                prompt=prompts,
                max_tokens=100  # 최대 반환값
            )

            # 응답에서 주석부분만 분리
            comment = response.choices[0].text.strip()

            result = "#" + comment + "\n" + line

            # 리트에 추가
            comments_list.append(result)
        
        return '\n'.join(comments_list)

    def process_and_save_code(file_path, output_file_path):
        # 파일을 읽어옵니다.
        with open(file_path, 'r') as file:
            code = file.read()

        # 주석을 생성합니다.
        comments = generate_code_comments(code)

        # 주석이 추가된 코드를 출력 파일에 쓰기 모드로 열어 저장합니다.
        with open(output_file_path, 'w') as output_file:
            output_file.write(comments)

    # 테스트용 파일 경로와 출력 파일 경로를 지정합니다.
    input_file_path = os.path.join(current_directory, 'saved_text.txt')
    output_file_path = os.path.join(current_directory, 'withComment.txt')

    # 주석을 추가하고 저장합니다.
    process_and_save_code(input_file_path, output_file_path)

    with open(output_file_path, 'r') as f_s:
        #code 변수에 문자열 저장
        result = f_s.readlines()

    return result

@app.route('/pt', methods=['GET'])
def pt():
    import test
    import CodeImage
    test.extract_files('backend/flask-server/saved_text.txt')
    
    # task1 = asyncio.create_task(wait())
    # await task1
    CodeImage.main()
    # 이미지 파일 경로를 리스트에 담기
    def get_image_paths_sorted_by_name(folder_path):
        # 폴더 내의 이미지 파일 경로 목록을 가져오기
        image_paths = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.png')]

        # 파일 이름의 숫자를 기준으로 정렬
        sorted_image_paths = sorted(image_paths, key=lambda x: int(''.join(filter(str.isdigit, os.path.basename(x)))))
            
        filenames = []
        for path in sorted_image_paths:
            # filename = os.path.basename(path)
            filenames.append(path)

        return filenames

    sorted_image_paths_list = get_image_paths_sorted_by_name('coomunity-app/public/code_images')

    #정렬된 이미지 파일 경로 리스트 확인
    # for i, image_path in enumerate(sorted_image_paths_list, start=1):
    #     print(f"Sorted Image {i} path: {image_path}")
    
    return jsonify(sorted_image_paths_list)
    
@app.route('/user_information', methods=['POST'])
def user_information():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        
        R1 = DBRequest.select_user_by_id(ID)
        S = json.dumps(R1)
        J = json.loads(S)
        tier = str(J[0].get('coding_skill_level', None))

        with open('backend/flask-server/nameJsons/tier_name.json', "r") as json_file:
            # JSON 파일을 딕셔너리로 로드
            tier_name_json = json.load(json_file)

        tier_name = tier_name_json[tier]
        J[0]['coding_skill_level'] = tier_name
        return jsonify(J[0])

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/user_update', methods=['POST', 'GET'])
def user_update():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        NICKNAME = json_data.get('nickname')
        IMAGE = json_data.get('img')
        JOB = json_data.get('job')
        INTRODUCTION = json_data.get('intro')
        TIER = json_data.get('tier')
        
        DBRequest.update_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, TIER)
        
        return "SUCCESS"

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
@app.route('/get_user_stack', methods=['POST', 'GET'])
def get_user_stack():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        result = DBRequest.select_user_tech_stack_by_userId(ID)

        stack_id_list = []
        for tech_stack in result:
            stack_id = tech_stack.get('tech_stack_id')
            
            stack_name = DBRequest.select_tech_stack_by_id(stack_id)[0].get('tech_name')
            stack_id_list.append(stack_name)
            
        return stack_id_list

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    

@app.route('/user_signup', methods=['POST'])
def user_signup():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        NICKNAME = json_data.get('nickname', None)
        IMAGE = json_data.get('img', None)
        JOB = json_data.get('job', None)
        INTRODUCTION = json_data.get('intro', None)
        TIER = json_data.get('tier', None)
        
        DBRequest.insert_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, TIER)
        
        return jsonify({'success': True, 'message': 'User registration successful'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/user_search', methods=['GET'])
def user_search():
    try:
        # 클라이언트에서 전송된 쿼리 매개변수를 받음
        ID = request.args.get('id')

        result = DBRequest.select_user_by_id(ID)
        user_exists = bool(result)

        return jsonify({'userExists': user_exists})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
@app.route('/nickname_search', methods=['GET'])
def nickname_search():
    try:
        # 클라이언트에서 전송된 쿼리 매개변수를 받음
        NICKNAME = request.args.get('nickname')

        result = DBRequest.select_user_by_nickname(NICKNAME)
        nickname_exists = bool(result)

        return jsonify({'userExists': nickname_exists})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    


@app.route('/user_delete', methods=['DELETE'])
def user_delete():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받지 않고 URL 매개변수에서 ID를 받음
        ID = request.args.get('id')
        
        DBRequest.delete_user(ID)
        
        return "SUCCESS"

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    
@app.route('/user_positions', methods = ['GET'])
def usr_positions():

    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        result = DBRequest.select_user_position_by_id(ID)

        position_id_list = []
        for positions in result:
            position_id = positions.get('position_id')
            
            position_name = DBRequest.select_position_by_id(position_id)[0].get('tech_name')
            position_id_list.append(position_name)
            
        return position_id_list

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    
    
@app.route('/profile_image', methods = ['POST', 'GET'])
def profile_image():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        TARGET_ID = json_data.get('target_user_id')
        FOLLOWER_ID = json_data.get('follower_user_id')       

        result = DBRequest.bool_target_follower(TARGET_ID, FOLLOWER_ID)
            
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    

@app.route('/position_ins_del', methods = ['POST', 'GET'])
def position_ins_del():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        TARGET_ID = json_data.get('target_user_id')
        FOLLOWER_ID = json_data.get('follower_user_id')       

        result = DBRequest.bool_target_follower(TARGET_ID, FOLLOWER_ID)
            
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
    
    
@app.route('/did_followed', methods = ['POST', 'GET'])
def did_followed():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        TARGET_ID = json_data.get('target_user_id')
        FOLLOWER_ID = json_data.get('follower_user_id')       

        result = DBRequest.bool_target_follower(TARGET_ID, FOLLOWER_ID)
            
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
    
@app.route('/count_follow', methods = ['POST', 'GET'])
def count_follow():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        
        FOLLOWING = DBRequest.count_followers_by_user(ID)
        FOLLOWER = DBRequest.count_followings_by_user(ID) 

        result = [FOLLOWING, FOLLOWER]
            
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    

@app.route('/list_follow', methods = ['POST', 'GET'])
def list_follow():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        ID = json_data.get('id')
        
        FOLLOWER = DBRequest.select_followers_by_user(ID)
        FOLLOWING = DBRequest.select_followings_by_user(ID)
        
        
        follower_list = [] # 이미지와 닉네임 쌍을 저장할 리스트
        following_list = []

        for user_info in FOLLOWER:
            # 이미지와 닉네임 추출
            image = user_info.get('profile_picture')
            nickname = user_info.get('nickname')

            # 쌍으로 묶어 리스트에 추가
            follower_list.append({'image': image, 'nickname': nickname})
            
        for user_info in FOLLOWING:
            # 이미지와 닉네임 추출
            image = user_info.get('profile_picture')
            nickname = user_info.get('nickname')

            # 쌍으로 묶어 리스트에 추가
            following_list.append({'image': image, 'nickname': nickname})
            
        result = {'follower': follower_list, 'following': following_list}
            
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
    
@app.route('/delete_follow', methods = ['POST', 'GET'])
def delete_follow():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        REQUEST = json_data.get('index')
        TARGET_ID = json_data.get('target_user_id')
        FOLLOWER_ID = json_data.get('follower_user_id')
        
        if REQUEST == 'follower':
            DBRequest.delete_follow(TARGET_ID, FOLLOWER_ID)
        else:
            DBRequest.delete_follow(FOLLOWER_ID, TARGET_ID)
            
        return "SUCCESS"

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
@app.route('/insert_follow', methods = ['POST', 'GET'])
def insert_follow():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        TARGET_ID = json_data.get('target_user_id')
        FOLLOWER_ID = json_data.get('follower_user_id')
        
        DBRequest.insert_follow(TARGET_ID, FOLLOWER_ID)
            
        return "SUCCESS"

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
@app.route('/login', methods=['POST'])
def login():
    try:
        # 클라이언트에서 전송된 JSON 데이터를 받음
        json_data = request.get_json()
        
        # 사용자 정보를 세션에 저장
        session['user_id'] = json_data.get('user_id')

        return jsonify({'success': True, 'message': 'Login successful'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    try:
        # 세션에서 사용자 정보를 가져옴
        user_id = session.get('user_id')

        if user_id:
            return jsonify({'success': True, 'user_id': user_id})
        else:
            return jsonify({'success': False, 'message': 'User not logged in'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    
    
if __name__ == '__main__':
    #웹 어플리케이션 실행
    app.run(host = "0.0.0.0", port=8000)