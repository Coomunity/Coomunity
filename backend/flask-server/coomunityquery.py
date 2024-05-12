import mysql.connector
class SQL:
    def __init__(self):
        self.db = mysql.connector.connect(
            host="54.180.147.40",
            user="jmin314",
            password="jmin0314",
            database="Coomunity"
        )

    def select(self, query, values=None):
        cursor = self.db.cursor(dictionary=True)
        if values:
            cursor.execute(query, values)
        else:
            cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        return data

    def insert(self, query, values=None):
        cursor = self.db.cursor(dictionary=True)
        if values:
            cursor.execute(query, values)
        else:
            cursor.execute(query)
        self.db.commit()
        cursor.close()

    def update(self, query, values=None):
        self.insert(query, values)

    def delete(self, query, values=None):
        self.insert(query, values)

    def close(self):
        self.db.close()

    # User Table
    def insert_user(self, id, nickname, profile_picture, job, introduction, coding_skill_level):
        query = "INSERT INTO User (id, nickname, profile_picture, job, introduction, coding_skill_level) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (id, nickname, profile_picture, job, introduction, coding_skill_level)
        self.insert(query, values)

    def select_user_by_id(self, id):
        query = "SELECT * FROM User WHERE id = %s"
        return self.select(query, (id,))
    
    def select_user_by_nickname(self, nickname):
        query = "SELECT * FROM User WHERE nickname = %s"
        return self.select(query, (nickname,))

    def update_user(self, id, nickname, profile_picture, job, introduction, coding_skill_level):
        query = "UPDATE User SET nickname = %s, profile_picture = %s, job = %s, introduction = %s, coding_skill_level = %s WHERE id = %s"
        values = (nickname, profile_picture, job, introduction, coding_skill_level, id)
        self.update(query, values)

    def delete_user(self, id):
        query = "DELETE FROM User WHERE id = %s"
        self.delete(query, (id,))

    # Follow Table
    def insert_follow(self, target_user_id, follower_user_id):
        query = "INSERT INTO Follow (target_user_id, follower_user_id) VALUES (%s, %s)"
        values = (target_user_id, follower_user_id)
        self.insert(query, values)

    def Bool_target_follower(self, target_user_id, follower_user_id):
        query =  "SELECT COUNT(*) AS count FROM Follow WHERE target_user_id = %s AND follower_user_id = %s"
        return self.select(query, (target_user_id, follower_user_id))
    
    def select_followers_by_user(self, target_user_id):
        query = "SELECT * FROM Follow WHERE target_user_id = %s"
        return self.select(query, (target_user_id,))

    def select_followings_by_user(self, follower_user_id):
        query = "SELECT * FROM Follow WHERE follower_user_id = %s"
        return self.select(query, (follower_user_id,))
    
    def count_followers_by_user(self, target_user_id):
        query = "SELECT COUNT(*) FROM Follow WHERE target_user_id = %s"
        result = self.select(query, (target_user_id,))
        # result는 [(count,)] 형태의 리스트이므로 첫 번째 열에 해당하는 개수를 반환
        return result[0][0] if result else 0
    
    def count_followings_by_user(self, follower_user_id):
        query = "SELECT COUNT(*) FROM Follow WHERE follower_user_id = %s"
        result = self.select(query, (follower_user_id,))
        return result[0][0] if result else 0

    def delete_follow(self, target_user_id, follower_user_id):
        query = "DELETE FROM Follow WHERE target_user_id = %s AND follower_user_id = %s"
        self.delete(query, (target_user_id, follower_user_id))

    # Mypage Table
    def insert_mypage(self, user_id):
        query = "INSERT INTO Mypage (user_id) VALUES (%s)"
        values = (user_id,)
        self.insert(query, values)

    def delete_mypage(self, id):
        query = "DELETE FROM Mypage WHERE id = %s"
        self.delete(query, (id,))

    # Board Table
    def insert_board(self, board_id, board_list, board_name):
        query = "INSERT INTO Board (board_id, board_list, board_name) VALUES (%s, %s, %s)"
        values = (board_id, board_list, board_name)
        self.insert(query, values)

    def select_board_by_board_id(self, board_id):
        query = "SELECT * FROM Board WHERE board_id = %s"
        return self.select(query, (board_id,))

    def update_board(self, board_id, board_list, board_name):
        query = "UPDATE Board SET board_list = %s, board_name = %s WHERE id = %s"
        values = (board_list, board_name, board_id)
        self.update(query, values)

    def delete_board(self, board_id):
        query = "DELETE FROM Board WHERE board_id = %s"
        self.delete(query, (board_id,))

    # Post Table
    def insert_post(self, post_id, author_id, board_id, title, content, date, image):
        query = "INSERT INTO Post (post_id, author_id, board_id, title, content, post_date, image) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (post_id, author_id, board_id, title, content, date, image)
        self.insert(query, values)

    def select_post_by_post_id(self, post_id):
        query = "SELECT * FROM Post WHERE post_id = %s"
        return self.select(query, (post_id,))
    
    def select_post_by_author_id(self, author_id):
        query = "SELECT * FROM Post WHERE author_id = %s"
        return self.select(query, (author_id,))
    
    def select_post_by_content(self, content):
        query = "SELECT * FROM Post WHERE content = %s"
        return self.select(query, (content,))
    
    def select_post_by_title(self, title):
        query = "SELECT * FROM Post WHERE title = %s"
        return self.select(query, (title,))
    
    def select_post_by_board_id(self, board_id):
        query = "SELECT * FROM Post WHERE board_id = %s"
        return self.select(query, (board_id,))

    def update_post(self, post_id, title, content, image):
        query = "UPDATE Post SET title = %s, content = %s, image = %s WHERE id = %s"
        values = (title, content, image, post_id)
        self.update(query, values)

    def delete_post(self, post_id):
        query = "DELETE FROM Post WHERE post_id = %s"
        self.delete(query, (post_id,))
        
    # Comment Table
    def insert_comment(self, author_id, post_id, content, date):
        query = "INSERT INTO Comment (author_id, post_id, content, date) VALUES (%s, %s, %s, %s)"
        values = (author_id, post_id, content, date)
        self.insert(query, values)

    def select_comment_by_id(self, id):
        query = "SELECT * FROM Comment WHERE id = %s"
        return self.select(query, (id,))

    def update_comment(self, id, content):
        query = "UPDATE Comment SET content = %s WHERE id = %s"
        values = (content, id)
        self.update(query, values)

    def count_comments_by_postId(self, post_id):
        query = "SELECT COUNT(*) FROM Comment WHERE post_id = %s"
        result = self.select(query, (post_id,))
        return result[0][0] if result else 0

    def delete_comment(self, id):
        query = "DELETE FROM Comment WHERE id = %s"
        self.delete(query, (id,))

    # LikeTable Table
    def insert_like(self, post_id, user_id):
        query = "INSERT INTO LikeTable (post_id, user_id) VALUES (%s, %s)"
        values = (post_id, user_id)
        self.insert(query, values)

    def select_like_by_id(self, id):
        query = "SELECT * FROM LikeTable WHERE id = %s"
        return self.select(query, (id,))
    
    def select_like_by_postId(self, post_id):
        query = "SELECT * FROM LikeTable WHERE post_id = %s"
        return self.select(query, (post_id,))

    def count_likes_by_postId(self, post_id):
        query = "SELECT COUNT(*) FROM Comment WHERE post_id = %s"
        result = self.select(query, (post_id,))
        return result[0][0] if result else 0


    def delete_like(self, id):
        query = "DELETE FROM LikeTable WHERE id = %s"
        self.delete(query, (id,))


    # Tier Table
    # id는 1~5의 값을 가진다
    # tier는 1부터 코린이, 코초딩, 코중딩, 코대딩, 코학사, 코박사 ( 임시 명칭 ) 
    def insert_tier(self, tier_type):
        query = "INSERT INTO Tier (tier_type) VALUES (%s)"
        values = (tier_type,)
        self.insert(query, values)

    def select_tier_by_id(self, id):
        query = "SELECT * FROM Tier WHERE id = %s"
        return self.select(query, (id,))

    # TechStack Table
    def insert_tech_stack(self, tech_name):
        query = "INSERT INTO TechStack (id, tech_name) VALUES (%s, %s)"
        values = (tech_name,)
        self.insert(query, values)

    def select_tech_stack_by_id(self, id):
        query = "SELECT * FROM TechStack WHERE id = %s"
        return self.select(query, (id,))


    # Position Table
    def insert_position(self, part_name):
        query = "INSERT INTO Position (part_name) VALUES (%s)"
        values = (part_name,)
        self.insert(query, values)

    def select_position_by_id(self, id):
        query = "SELECT * FROM Position WHERE id = %s"
        return self.select(query, (id,))

    # UserTier Table
    def insert_user_tier(self,user_id, tier_id):
        query = "INSERT INTO UserTier (user_id, tier_id) VALUES (%s, %s)"
        values = (user_id, tier_id)
        self.insert(query, values)

    def select_user_tier_by_id(self, id):
        query = "SELECT * FROM UserTier WHERE id = %s"
        return self.select(query, (id,))

    def delete_user_tier(self, id):
        query = "DELETE FROM UserTier WHERE id = %s"
        self.delete(query, (id,))

    # UserTechStack Table
    def insert_user_tech_stack(self, user_id, tech_stack_id):
        query = "INSERT INTO UserTechStack (user_id, tech_stack_id) VALUES (%s, %s)"
        values = (user_id, tech_stack_id)
        self.insert(query, values)

    def select_user_tech_stack_by_userId(self, user_id):
        query = "SELECT * FROM UserTechStack WHERE user_id = %s"
        return self.select(query, (user_id,))
    
    def delete_user_tech_stack_by_id(self, user_id, tech_stack_id):
        query = "DELETE FROM UserTechStack WHERE user_id = %s AND tech_stack_id = %s"
        self.delete(query, (user_id, tech_stack_id))

    # UserPosition Table
    def insert_user_position(self, user_id, position_id):
        query = "INSERT INTO UserPosition (user_id, position_id) VALUES (%s, %s)"
        values = (user_id, position_id)
        self.insert(query, values)

    def select_user_position_by_id(self, user_id):
        query = "SELECT * FROM UserPosition WHERE user_id = %s"
        return self.select(query, (user_id,))
    
    def delete_user_position_by_id(self, user_id, position_id):
        query = "DELETE FROM UserPosition WHERE user_id = %s AND position_id = %s"
        self.delete(query, (user_id, position_id))

    # PostStack Table
    def insert_post_tech_stack(self, post_id, skill_stack_id):
        query = "INSERT INTO PostSkillStack (post_id, skill_stack_id) VALUES (%s, %s)"
        values = (post_id, skill_stack_id)
        self.insert(query, values)

    def select_post_tech_stack_by_id(self, id):
        query = "SELECT * FROM PostSkillStack WHERE id = %s"
        return self.select(query, (id,))
    
    def select_post_tech_stack_by_postId(self, post_id):
        query = "SELECT * FROM PostSkillStack WHERE post_id = %s"
        return self.select(query, (post_id,))

    # PostPosition Table
    def insert_post_position(self, post_id, position_id):
        query = "INSERT INTO PostPosition (post_id, position_id) VALUES (%s, %s)"
        values = (post_id, position_id)
        self.insert(query, values)

    def select_post_position_by_id(self, id):
        query = "SELECT * FROM PostPosition WHERE id = %s"
        return self.select(query, (id,))
    
    def select_post_position_by_postId(self, post_id):
        query = "SELECT * FROM PostPosition WHERE post_id = %s"
        return self.select(query, (post_id,))





# 예시 사용주석입니다.... 살려주세요.......
#user data 부분도 예시 아래도 예시. 백에서 쿼리호출할부분에 함수로 호출
# /*def expiredSession(id) :
#     sql.update(f"UPDATE session SET manual_expired = 1 WHERE session_id = '{id}'")

# def getSession(id) :
#     characters = string.ascii_letters + string.digits
#     random_string = ''.join(random.choice(characters) for _ in range(128))
#     current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#     sql.insert(f"INSERT INTO session(session_id, session, init_time, last_time) VALUES('{id}', '{random_string}', '{current_time}', '{current_time}')")
#     return random_string

# def getSessionId(request : Request, session_key : str) :
#     session_value = request.cookies.get(session_key)

#     if session_value:
#         result = sql.select(f"SELECT session_id FROM session WHERE session = '{session_value}' AND manual_expired = 0 ORDER BY last_time DESC LIMIT 1")
#         return result[0]['session_id']
#     else:
#         return {"result": "Session value not found"}*/

# sql = SQL()

# 사용자 추가
# user_data = {
#     "id": 1,
#     "nickname": "new_nickname",
#     "profile_picture": "new_picture.jpg",
#     "job": "new_job",
#     "introduction": "new_intro",
#     "coding_skill_level": 3
# }
# sql.insert_user(**user_data)

# user_data = {
#     "id": 2,
#     "nickname": "new_nickname",
#     "profile_picture": "new_picture.jpg",
#     "job": "new_job",
#     "introduction": "new_intro",
#     "coding_skill_level": 3
# }
# sql.insert_user(**user_data)
# 팔로우 추가
# follow_data = {
#     "id": 1,
#     "target_user_id": 2,
#     "follower_user_id": 1
# }
# sql.insert_follow(**follow_data)

# # 사용자 조회
# user_info = sql.select_user_by_id(1)

# # 사용자 업데이트
# sql.update_user(1, "updated_nickname", "updated_picture.jpg", "updated_job", "updated_intro", 4)

# # 팔로우 조회
# follow_info = sql.select_follow_by_id(1)

# 사용자 삭제
# sql.delete_user(1)