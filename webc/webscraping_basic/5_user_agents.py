import requests
url = "http://nadocoding.tistory.com"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"}
res = requests.get(url, headers=headers)
res.raise_for_status() #문제 생기면 오류 뱉고 출력 x
with open("nadocoding.html","w",encoding ="utf8") as f:
    f.write(res.text)
