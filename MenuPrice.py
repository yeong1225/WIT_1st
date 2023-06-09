from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

# Chrome WebDriver 경로 설정
webdriver_path = './chromedriver.exe'  # 이동식 디스크에 Chrome Webdirver 저장

# 크롬 브라우저 옵션 설정
chrome_options = Options()
chrome_options.add_argument('--headless')  # 브라우저를 띄우지 않고 실행 (백그라운드 실행)

# 웹드라이버 실행
driver = webdriver.Chrome(executable_path=webdriver_path, options=chrome_options)

# 대표 메뉴 크롤링 함수
def crawl_menu(naver_map_url):
    driver.get(naver_map_url)
    driver.implicitly_wait(3)

    try:
        # 대표 메뉴 크롤링
        html = driver.page_source
        soup = BeautifulSoup(html, 'lxml')
        menu_list = soup.find('div.MN48z') # 큰 메뉴

        for menu in menu_list:
            #세부적 메뉴
            menu_name = menu.find_all('div.MENtl')
            menu_price = menu.find_all('div.gl2cc')

            print("메뉴: ", menu_name.get_text())
            print("가격: ", menu_price.get_text())
            print('--------------------')

    except Exception as e:
        print("크롤링 에러:", e)

    driver.quit()

# 네이버지도 URL 설정
naver_map_url = 'https://map.naver.com/v5/entry/place/37623870?c=15,0,0,0,dh&isCorrectAnswer=true'  # 코드 성공 시, url연동 예정

# 대표 메뉴 크롤링 실행
crawl_menu(naver_map_url)
