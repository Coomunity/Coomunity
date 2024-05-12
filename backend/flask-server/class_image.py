from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path



class DiagramDrawer:
    def __init__(self, width=400, height=400):
        self.img = Image.new('RGB', (width, height), color=(255, 255, 255))
        self.draw = ImageDraw.Draw(self.img)
        self.font = ImageFont.load_default()

    def draw_diagram(self, class_name, instance_variables,class_variable,line_num ):
        font = ImageFont.truetype("backend/flask-server/dHuf9CilzKxTAu4-fYI57Qin0jo.ttf", 17)
        class_name_font = ImageFont.truetype("backend/flask-server/dHuf9CilzKxTAu4-fYI57Qin0jo.ttf", 25)
        class_font = ImageFont.truetype("backend/flask-server/dHuf9CilzKxTAu4-fYI57Qin0jo.ttf", 15)

        top_rectangle = (10 + 100 + 15, 10, 10 + 100 + int(0.8 * 190) + 15, 30 + int(0.8 * 65))
        self.draw.rectangle(top_rectangle, outline="black", width=3, fill="yellow")

        class_text1 = "Address :"
        class_text2 = hex(id(class_name))
        class_width, class_height = self.draw.textbbox((0, 0), class_text1, font=class_font)[2:]
        class_x = 20 + 100 + int(0.8 * 190) / 2 + 15
        class_y = 25 + int(0.8 * 65) / 2
        self.draw.text((45 + 100 + 15, class_y-20), class_text1, fill="black", font=class_font)
        self.draw.text((45 + 100 + 15, class_y), class_text2, fill="black", font=class_font)

        class_var_text = "" + class_variable
        self.draw.text((30, class_y-20), class_var_text, fill="black", font=class_name_font)

        bottom_rectangle = (10 + 100 + 15, 150, 10 + 100 + int(0.8 * 190) + 15, 150 + int(0.8 * 75)+50)
        self.draw.rectangle(bottom_rectangle, outline="black", width=3, fill="orange")

        y_position = 165
        for variable_name, variable_value in instance_variables.items():
            text = "{}: {}".format(variable_name, variable_value)
            text_bbox = self.draw.textbbox((0, 0), text, font=font)
            text_width, text_height = text_bbox[2:]
            max_width = int(0.8 * 190) - 30
            if text_width > max_width:
                text_width = max_width
                text = text[:8] + "..."
            self.draw.text((25 + 100 + 15, y_position), text, fill="black", font=font)
            y_position += text_height

        arrow_start = (10 + 100 + int(0.8 * 190) + 15,int(1 * 65) / 2 -10+20)
        #arrow_control1 = (250 + 100 + 15, 40)
        arrow_control2 = (250 + 100 + 15, (130 + int(0.7 * 75)+40)/2)
        arrow_end = (10 + 100 + int(0.8 * 190) + 15, 130 + int(0.7 * 75))
        self.draw.line([arrow_start, arrow_control2, arrow_end], fill="red", width=5)
        self.draw.polygon([arrow_end, (arrow_end[0] + 15, arrow_end[1] - 25), (arrow_end[0] + 30, arrow_end[1]-10)],
                     fill="red")


        address_width, address_height = self.draw.textbbox((0, 0), class_text2, font=class_font)[2:]
        address_x = 40
        address_y = 140 + int(0.8 * 75) / 2
        self.draw.text((address_x, address_y), class_text2, fill="black", font=class_font)

        filename = str(line_num) + '.png'
        path_to_file = Path('coomunity-app/public/code_images') / filename
        self.img.save(path_to_file)


def class_images(class_name, class_var, instance_name, instance_value,line_num):
    instance_variables = {}

    for a,b in zip(instance_name,instance_value):
        instance_variables[str(a)] = str(b)

    #class_obj = globals()[class_name]

    diagram_drawer = DiagramDrawer()
    diagram_drawer.draw_diagram(class_name, instance_variables, class_var,line_num)









