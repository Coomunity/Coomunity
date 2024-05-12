import os
def get_image_paths_sorted_by_name(folder_path):
<<<<<<< Updated upstream
    # 폴더 내의 이미지 파일 경로 목록을 가져오기
    image_paths = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.png')]

    # 파일 이름의 숫자를 기준으로 정렬
    sorted_image_paths = sorted(image_paths, key=lambda x: int(''.join(filter(str.isdigit, os.path.basename(x)))))
        
    filenames = []
    for path in sorted_image_paths:
        # filename = os.path.basename(path)
        filenames.append(path)

    return filenames
=======
     # 폴더 내의 이미지 파일 경로 목록을 가져오기
    image_paths = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.png')]

    # 파일 이름의 숫자를 기준으로 정렬
    sorted_image_paths = sorted(image_paths, key=lambda x: ''.join(filter(str.isdigit, os.path.basename(x))))
    
    filenames = []
    for path in sorted_image_paths:
        
        print(path)
        filename = os.path.basename(path)
        
        filenames.append(filename)
        
    return filename
>>>>>>> Stashed changes

print(get_image_paths_sorted_by_name('coomunity-app/public/code_images'))