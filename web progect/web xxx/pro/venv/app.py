from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__, template_folder="templates")
app.secret_key = 'your_secret_key'  # سر الجلسة (session) لتخزين البيانات بين الصفحات

# بيانات المستخدم (يمكنك استبدالها بقاعدة بيانات)
users_db = {}

# صفحة التسجيل
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # الحصول على بيانات المستخدم المدخلة
        username = request.form['username']
        password = request.form['password']
        
        # إضافة بيانات المستخدم إلى قاعدة البيانات (المؤقتة هنا)
        if username in users_db:
            flash("Username already exists!", "error")
            return redirect(url_for('signup'))  # إذا كان المستخدم موجوداً بالفعل، أعد التوجيه
        else:
            users_db[username] = password
            flash("Account created successfully!", "success")
            return redirect(url_for('page1'))  # إعادة التوجيه إلى صفحة الدخول بعد التسجيل
    return render_template('signup.html')

# صفحة تسجيل الدخول
@app.route('/', methods=['GET', 'POST'])
def page1():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # التحقق من بيانات تسجيل الدخول
        if username in users_db and users_db[username] == password:
            session['username'] = username  # تخزين اسم المستخدم في الجلسة (session)
            return redirect(url_for('page2'))  # إذا كانت البيانات صحيحة، يتم الانتقال إلى الصفحة 2
        else:
            flash("Invalid username or password", "error")  # إذا كانت البيانات غير صحيحة
            return redirect(url_for('page1'))  # إعادة التوجيه إلى صفحة تسجيل الدخول
    
    return render_template('page1.html')

# صفحة page2 بعد تسجيل الدخول بنجاح
@app.route('/page2')
def page2():
    # التحقق من الجلسة
    if 'username' in session:
        return render_template('page2.html')
    else:
        return redirect(url_for('page1'))  # إذا لم يكن المستخدم مسجلاً دخوله، يتم توجيهه إلى صفحة تسجيل الدخول

# صفحة page3 وما بعدها
@app.route('/page3')
def page3():
    return render_template('page3.html')

# صفحة page4 وما بعدها
@app.route('/page4')
def page4():
    return render_template('page4.html')

# صفحة page5 وما بعدها
@app.route('/page5')
def page5():
    return render_template('page5.html')

# صفحة page6 وما بعدها
@app.route('/page6')
def page6():
    return render_template('page6.html')

# صفحة page7 وما بعدها
@app.route('/page7')
def page7():
    return render_template('page7.html')

# صفحة page8 وما بعدها
@app.route('/page8')
def page8():
    return render_template('page8.html')

if __name__ == '__main__':
    app.run(debug=True)
