from flask import jsonify
import coomunityquery

instance = coomunityquery.SQL()

# User Table ===================================================
def insert_user(id, nickName, image, job, introduction, level):

        instance.insert_user(id, nickName, image, job, introduction, level)
        
        return 'SUCCESS'


def select_user_by_id(id):
        
        result = instance.select_user_by_id(id)
        
        return result


# 같은 닉네임인 사람 찾기
def select_user_by_nickname(nickname):
        
        
    result = instance.select_user_by_nickname(nickname)
        
    return result
    
# 유저정보 수정
def update_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, LEVEL):
      
    instance.update_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, LEVEL)
        
    return 'SUCCESS'
    
def update_user_id(ID):
        
    instance.update_user_id(ID)
        
    return 'SUCCESS'
    
def update_user_nickname(NICKNAME):
        
    instance.update_user_id(NICKNAME)
        
    return 'SUCCESS'
    
def update_user_image(IMAGE):
        
    instance.update_user_id(IMAGE)
        
    return 'SUCCESS'
    
def update_user_job(JOB):
        
    instance.update_user_id(JOB)
        
    return 'SUCCESS'
    
def update_user_introduction(INTRODUCTION):
        
    instance.update_user_id(INTRODUCTION)
        
    return 'SUCCESS'
    
def update_user_level(LEVEL):
        
    instance.update_user_id(LEVEL)
        
    return 'SUCCESS'

    
def delete_user(ID):
        
    instance.delete_user(ID)
        
    return 'SUCCESS'     
   
def select_user_position_by_id(ID):

    result = instance.select_user_position_by_id(ID)
        
    return result

# User Table ===================================================


# Follow ========================================================
def insert_follow(TARGET_USER_ID, FOLLOWER_USER_ID):
    
    instance.insert_follow(TARGET_USER_ID, FOLLOWER_USER_ID)
        
    return 'SUCCESS'
    
def select_follow_by_id(TARGET_USER_ID):
        
        
    result = instance.select_follow_by_id(TARGET_USER_ID)
        
    return result
    
def select_followers_by_user(TARGET_USER_ID):
        
    result = instance.select_followers_by_user(TARGET_USER_ID)
        
    return result

def select_followings_by_user(FOLLOWER_USER_ID):
         
    result = instance.select_followings_by_user(FOLLOWER_USER_ID)
        
    return result
    
def count_followers_by_user(TARGET_USER_ID):
           
    result = instance.count_followers_by_user(TARGET_USER_ID)
        
    return result
    
def count_followings_by_user(FOLLOWER_USER_ID):
                
    result = instance.count_followings_by_user(FOLLOWER_USER_ID)
        
    return result
    
def delete_follow(TARGET_USER_ID, FOLLOWER_USER_ID):
            
    instance.delete_follow(TARGET_USER_ID, FOLLOWER_USER_ID)
        
    return 'SUCCESS'


def select_tech_stack_by_id(ID):
    
    result = instance.select_tech_stack_by_id(ID)
        
    return result

# Follow ========================================================


 # Mypage Tabel ===================================================
def insert_mypage(UID):
        
    instance.insert_mypage(UID)
        
    return 'SUCCESS'

def delete_mypage(ID):
         
    instance.delete_mypage(ID)
        
    return 'SUCCESS'

def select_user_tech_stack_by_userId(ID):
        
    result = instance.select_user_tech_stack_by_userId(ID)
        
    return result

def select_position_by_id(ID):

    result = instance.select_position_by_id(ID)
        
    return result

def bool_target_follower(TARGET_ID, FOLLOWER_ID):
    
    result = instance.Bool_target_follower(TARGET_ID, FOLLOWER_ID)
    if len(result) == 0:
        return False
    else:
        return True

#  Mypage Tabel ===================================================     

def main(json_data):
    
    instance = coomunityquery.SQL()
    
    Rrequest = json_data.get('request')
    
    # User Table
    if Rrequest == 'insert_user': 
        ID = json_data.get('id')
        NICKNAME = json_data.get('ni')
        IMAGE = json_data.get('img')
        JOB = json_data.get('J')
        INTRODUCTION = json_data.get('intro')
        LEVEL = json_data.get('CL')
        
        instance.insert_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, LEVEL)
        
        return 'SUCCESS'
    
    elif Rrequest == 'select_user_by_id': #
        ID = json_data.get('id')
        
        result = instance.select_user_by_id(ID)
        
        return result
    
    # 같은 닉네임인 사람 찾기
    elif Rrequest == 'select_user_by_nickname':
        NICKNAME = json_data.get('ni')
        
        result = instance.select_user_by_nickname(NICKNAME)
        
        return result
    
    # 유저정보 수정
    elif Rrequest == 'update_user':
        ID = json_data.get('id')
        NICKNAME = json_data.get('ni')
        IMAGE = json_data.get('img')
        JOB = json_data.get('J')
        INTRODUCTION = json_data.get('intro')
        LEVEL = json_data.get('CL')
        
        instance.update_user(ID, NICKNAME, IMAGE, JOB, INTRODUCTION, LEVEL)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_id':
        ID = json_data.get('id')
        
        instance.update_user_id(ID)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_nickname':
        ID = json_data.get('ni')
        
        instance.update_user_id(NICKNAME)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_image':
        ID = json_data.get('img')
        
        instance.update_user_id(IMAGE)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_job':
        ID = json_data.get('J')
        
        instance.update_user_id(JOB)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_introduction':
        ID = json_data.get('intro')
        
        instance.update_user_id(INTRODUCTION)
        
        return 'SUCCESS'
    
    elif Rrequest == 'update_user_level':
        ID = json_data.get('CL')
        
        instance.update_user_id(LEVEL)
        
        return 'SUCCESS'

    
    elif Rrequest == 'delete_user':
        ID = json_data.get('id')
        
        instance.delete_user(ID)
        
        return 'SUCCESS'
        

    # Follow Table
    elif Rrequest == 'insert_follow':
        TARGET_USER_ID = json_data.get('targetUID')
        FOLLOWER_USER_ID = json_data.get('followerUID')
        
        instance.insert_follow(TARGET_USER_ID, FOLLOWER_USER_ID)
        
        return 'SUCCESS'
    
    elif Rrequest == 'select_follow_by_id':
        TARGET_USER_ID = json_data.get('targetUID')
        
        result = instance.select_follow_by_id(TARGET_USER_ID)
        
        return result

    elif Rrequest == 'select_followers_by_user':
        TARGET_USER_ID = json_data.get('targetUID')
        
        result = instance.select_followers_by_user(TARGET_USER_ID)
        
        return result

    elif Rrequest == 'select_followings_by_user':
        FOLLOWER_USER_ID = json_data.get('followerUID')
        
        result = instance.select_followings_by_user(FOLLOWER_USER_ID)
        
        return result
    
    elif Rrequest == 'count_followers_by_user':
        TARGET_USER_ID = json_data.get('targetUID')
        
        result = instance.count_followers_by_user(TARGET_USER_ID)
        
        return result
    
    elif Rrequest == 'count_followings_by_user':
        FOLLOWER_USER_ID = json_data.get('followerUID')
        
        result = instance.count_followings_by_user(FOLLOWER_USER_ID)
        
        return result
    
    elif Rrequest == 'delete_follow':
        ID = json_data.get('id')
        TARGET_USER_ID = json_data.get('targetUID')
        FOLLOWER_USER_ID = json_data.get('followerUID')
        
        instance.delete_follow(ID, TARGET_USER_ID, FOLLOWER_USER_ID)
        
        return 'SUCCESS'


    # Mypage Tabel
    elif Rrequest == 'insert_mypage':
        UID = json_data.get('uid')
        
        instance.insert_mypage(UID)
        
        return 'SUCCESS'

    elif Rrequest == 'delete_mypage':
        ID = json_data.get('id')
        
        instance.delete_mypage(ID)
        
        return 'SUCCESS'
    
    
    # Board Table
    elif Rrequest == 'insert_board':
        BOARD_ID = json_data.get('board_id')
        BLIST = json_data.get('b_list')
        BNAME = json_data.get('b_name')
        
        instance.insert_mypage(BOARD_ID, BLIST, BNAME)
        
        return 'SUCCESS'
    
    elif Rrequest == 'select_board_by_board_id':
        BOARD_ID = json_data.get('board_id')
        
        result = instance.select_board_by_board_id(BOARD_ID)
        
        return result    

    elif Rrequest == 'update_board':
        BOARD_ID = json_data.get('board_id')
        BLIST = json_data.get('b_list')
        BNAME = json_data.get('b_name')
        
        instance.update_board(BOARD_ID, BLIST, BNAME)
        
        return 'SUCCESS'

    elif Rrequest == 'delete_board':
        BOARD_ID = json_data.get('board_id')
        
        instance.delete_board(BOARD_ID)
        
        return 'SUCCESS'    
    
    
    # Post Table
    elif Rrequest == 'insert_post':
        POSTSID = json_data.get('post_id')
        AUTHORID = json_data.get('author_id')
        BID = json_data.get('b_id')
        TITLE = json_data.get('Tle')
        CONTENT = json_data.get('cont')
        DATE = json_data.get('daytime')
        IMAGE = json_data.get('img')
        
        instance.insert_post(POSTSID, AUTHORID, BID, TITLE, CONTENT, DATE, IMAGE)
        
        return 'SUCCESS'
    
    elif Rrequest == 'select_post_by_post_id':
        POSTSID = json_data.get('post_id')
        
        result = instance.select_post_by_id(POSTSID)
        
        return result
    
    elif Rrequest == 'select_post_by_author_id':
        AUTHORID = json_data.get('author_id')
        
        result = instance.select_post_by_author_id(AUTHORID)
        
        return result
    
    elif Rrequest == 'select_post_by_content':
        CONTENT = json_data.get('cont')
        
        result = instance.select_post_by_content(CONTENT)
        
        return result
    
    elif Rrequest == 'select_post_by_title':
        TITLE = json_data.get('Tle')
        
        result = instance.select_post_by_tilte(TITLE)
        
        return result
    
    elif Rrequest == 'select_post_by_board_id':
        BOARDID = json_data.get('board_id')
        
        result = instance.select_post_by_board_id(BOARDID)
        
        return result
    
    elif Rrequest == 'update_post':
        POSTSID = json_data.get('post_id')
        TITLE = json_data.get('Tle')
        CONTENT = json_data.get('cont')
        IMAGE = json_data.get('img')
        
        instance.update_post(POSTSID, TITLE, CONTENT, IMAGE)
        
        return 'SUCCESS'

    elif Rrequest == 'delete_post':
        POSTSID = json_data.get('post_id')
        
        instance.delete_post(POSTSID)
        
        return 'SUCCESS' 
    
    
    # Comment Table
    elif Rrequest == 'insert_comment':
        AUTHORID = json_data.get('aid')
        POSTID = json_data.get('p_id')
        CONTENT = json_data.get('cont')
        DATE = json_data.get('daytime')
        
        instance.insert_comment(AUTHORID, POSTID, CONTENT, DATE)
        
        return 'SUCCESS'   
    
    elif Rrequest == 'select_comment_by_id':
        ID = json_data.get('id')
        
        result = instance.select_comment_by_id(ID)
        
        return result

    elif Rrequest == 'update_comment':
        ID = json_data.get('id')
        CONTENT = json_data.get('cont')
        
        instance.update_comment(ID, CONTENT)
        
        return 'SUCCESS'   
    
    elif Rrequest == 'count_comments_by_postId':
        POSTID = json_data.get('p_id')
        
        result = instance.count_comments_by_postId(ID, POSTID)
        
        return result
    
    elif Rrequest == 'delete_comment':
        ID = json_data.get('id')
        
        instance.delete_comment(ID)
        
        return 'SUCCESS' 
    
    
    # LikeTable Table
    elif Rrequest == 'insert_like':
        POSTID = json_data.get('p_id')
        UID = json_data.get('u_id')
        
        instance.insert_like(POSTID, UID)
        
        return 'SUCCESS'     

    elif Rrequest == 'select_like_by_id':
        ID = json_data.get('id')
        
        result = instance.select_like_by_id(ID)
        
        return result

    elif Rrequest == 'select_like_by_postId':
        POSTID = json_data.get('p_id')
        
        result = instance.select_like_by_postId(POSTID)
        
        return result
    
    elif Rrequest == 'count_likes_by_postId':
        POSTID = json_data.get('p_id')
        
        result = instance.count_likes_by_postId(POSTID)
        
        return result
    
    elif Rrequest == 'delete_like':
        ID = json_data.get('id')
        
        instance.delete_like(ID)
        
        return 'SUCCESS'
    
    
    # Tier Table
    elif Rrequest == 'insert_tier':
        TIER = json_data.get('tiertype')
        
        instance.insert_tier(TIER)
        
        return 'SUCCESS'

    elif Rrequest == 'select_tier_by_id':
        ID = json_data.get('id')
        
        result = instance.select_tier_by_id(ID)
        
        return result
    
    
    # TechStack Table
    elif Rrequest == 'insert_tech_stack':
        TECHNAME = json_data.get('t_name')
        
        instance.insert_tech_stack(TECHNAME)
        
        return 'SUCCESS'    
    

    
    
    # Position Table
    elif Rrequest == 'insert_position':
        PARTNAME = json_data.get('p_name')
        
        instance.insert_position(PARTNAME)
        
        return 'SUCCESS'    
    

    
    
    # UserTier Table
    elif Rrequest == 'insert_user_tier':
        UID = json_data.get('u_id')
        TIERID = json_data.get('t_id')
        
        instance.insert_position(UID, TIERID)
        
        return 'SUCCESS'    
    
    elif Rrequest == 'select_user_tier_by_id':
        ID = json_data.get('id')
        
        result = instance.select_user_tier_by_id(ID)
        
        return result
    
    elif Rrequest == 'delete_user_tier':
        ID = json_data.get('id')
        
        result = instance.delete_user_tier(ID)
        
        return result
    
    
    # UserTechStack Table
    elif Rrequest == 'insert_user_tech_stack':
        UID = json_data.get('u_id')
        TECHSTACKID = json_data.get('t_s_id')
        
        instance.insert_user_tech_stack(UID, TECHSTACKID)
        
        return 'SUCCESS'    
    

    
    elif Rrequest == 'delete_user_tech_stack_by_id':
        UID = json_data.get('u_id')
        TECHSTACKID = json_data.get('t_s_id')

        instance.delete_user_tech_stack_by_id(UID, TECHSTACKID)
    
        return 'SUCCESS'   
    
    # UserPosition Table
    elif Rrequest == 'insert_user_tech_stack':
        UID = json_data.get('u_id')
        POSITIONID = json_data.get('pos_id')
        
        instance.insert_user_tech_stack(UID, POSITIONID)
        
        return 'SUCCESS'    
    

    
    elif Rrequest == 'delete_user_position_by_id':
        UID = json_data.get('u_id')
        POSITIONID = json_data.get('pos_id')

        instance.delete_user_position_by_id(UID, POSITIONID)

        return 'SUCCESS'   

    # PostStack Table
    elif Rrequest == 'insert_post_tech_stack':
        POSTID = json_data.get('p_id')
        SKILSTACKID = json_data.get('ss_id')
        
        instance.insert_post_tech_stack(POSTID, SKILSTACKID)
        
        return 'SUCCESS'    
    
    elif Rrequest == 'select_post_tech_stack_by_id':
        ID = json_data.get('id')
        
        result = instance.select_post_tech_stack_by_id(ID)
        
        return result
    
    elif Rrequest == 'select_post_tech_stack_by_postId':
        POSTID = json_data.get('p_id')
        
        result = instance.select_post_tech_stack_by_postId(POSTID)
        
        return result
    
    
    # PostPosition Table
    elif Rrequest == 'insert_post_position':
        POSTID = json_data.get('p_id')
        POSITIONID = json_data.get('pos_id')
        
        instance.insert_post_position(POSTID, POSITIONID)
        
        return 'SUCCESS'    
    
    elif Rrequest == 'select_post_position_by_id':
        ID = json_data.get('id')
        
        result = instance.select_post_position_by_id(ID)
        
        return result
    
    elif Rrequest == 'select_post_position_by_postId':
        POSTID = json_data.get('p_id')
        
        result = instance.select_post_position_by_postId(POSTID)
        
        return result
    
    else:
        return 'Request error'