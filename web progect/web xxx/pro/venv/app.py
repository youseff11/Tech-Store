from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__, template_folder="templates")
app.secret_key = 'your_secret_key'  
users_db = {}

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':

        username = request.form['username']
        password = request.form['password']
        
        if username in users_db:
            flash("Username already exists!", "error")
            return redirect(url_for('signup'))
        else:
            users_db[username] = password
            flash("Account created successfully!", "success")
            return redirect(url_for('page1')) 
    return render_template('signup.html')


@app.route('/', methods=['GET', 'POST'])
def page1():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users_db and users_db[username] == password:
            session['username'] = username 
            return redirect(url_for('page2')) 
        else:
            flash("Invalid username or password", "error") 
            return redirect(url_for('page1')) 
    
    return render_template('page1.html')

@app.route('/page2')
def page2():

    if 'username' in session:
        return render_template('page2.html')
    else:
        return redirect(url_for('page1')) 

@app.route('/page3')
def page3():
    return render_template('page3.html')

@app.route('/page4')
def page4():
    return render_template('page4.html')

@app.route('/page5')
def page5():
    return render_template('page5.html')

@app.route('/page6')
def page6():
    return render_template('page6.html')

@app.route('/page7')
def page7():
    return render_template('page7.html')

@app.route('/page8')
def page8():
    return render_template('page8.html')

if __name__ == '__main__':
    app.run(debug=True)
