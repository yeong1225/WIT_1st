from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Python 코드 실행 및 결과 반환
    message = "Hello, World!"
    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run()
