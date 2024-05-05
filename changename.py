"""
Fichier pour tranformer les ancien nom de carte en notre nom typé et normalisé


Fait

"""
import os
import shutil
def transform(nb):
    return chr(65+int(nb))
directory = '.\cartes'
dicta = {
    "d":13,
    "c":12,
    "v":11,
    "r":14,
    "e":0
}

for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    if os.path.isfile(f):
        cl=""
        nb=""
        filename = filename[:-4]
        try:
            int(filename)
            cl="at"
            nb=transform(filename)
            print(cl,nb)
        except ValueError:
            n1=filename[0]
            try:
                int(filename[1])
                n1+=filename[1]
            except (ValueError,IndexError):
                a=0
            try:
                n1=int(n1)
            except ValueError:
                n1= dicta[n1]
            nb=transform(n1)
            if filename=="e":
                print("yoooooooooooooooooooooooooooooooooooooo")
                cl="at"
            else:
                cl=filename[-2:]
            print(cl,nb,n1)
        
        shutil.copyfile(f,".\\card\\"+nb+cl+".png")


        