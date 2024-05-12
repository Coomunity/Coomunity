import json

# 샘플 데이터 (딕셔너리 형태)
data = {
    "1": "Android",
    "2": "iOS",
    "3": "Web",
    "4": "Server",
    "5": "PM",
    "6": "Design"
}

# JSON 파일로 저장
with open("positioin_name.json", "w") as json_file:
    json.dump(data, json_file)