import requests
res = requests.get("http://google.com")
res.raise_for_status() #문제 생기면 오류 뱉고 출력 x
print(len(res.text))
print(res.text)

with open("mygoogle.html","w",encoding ="utf8") as f:
    f.write(res.text)