import requests
from bs4 import BeautifulSoup

url = "https://comic.naver.com/index"
res = requests.get(url) #res가 url을 받음.
res.raise_for_status() #오류가 나면 밑에 다 실행 x

soup = BeautifulSoup(res.text, "lxml") #soup이 모든 정보를 가지게 됨.
#print(soup.title)
#print(soup.title.get_text()) #텍스트 문서만 가져오기
#print(soup.a) #처음으로 발견되는 a 문서에 대해 가져와줘.
exa = "/div[1]/a[1]"
print(soup.exa)
