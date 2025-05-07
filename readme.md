# 🏅 Badge of Honor

Displays a list of contributors to a GitHub repository, sorted by the total number of **Pull Requests**.

---

## ⚠️ Alpha Version - Ongoing Improvements
🚀 **This project is currently in Alpha stage.** It is **fully functional in production**, but some enhancements are planned to improve stability and features.

### 🔧 **Upcoming Improvements:**
- ✅ **Optimize API performance** for faster badge generation.
- ✅ **Add more customization options** (fonts, border styles, additional colors).
- ✅ **Enhance error handling** for invalid repository names or missing parameters.
- ✅ **Implement caching** to reduce load times and API requests.
- ✅ **Improve documentation** with more examples and troubleshooting tips.
- ✅ **Use MySQL as the database backend** for storing contributor data.
- ✅ **Improve database queries** to reduce API rate limits from GitHub.

👉 **Feel free to contribute or suggest improvements!** 🚀

---

## 🚀 Installation & Usage

### **1. Build and Start the Application**
### 🛠 Development Setup
You can use either **Podman** or **Docker**:

#### **With Podman**
```sh
# first install or rebuild
npm run podman:build
# quick run after first build
npm run podman:start
```
#### **With Docker**
```sh
# first install or rebuild
npm run docker:build
# quick run after first build
npm run docker:start
```

### 🛠 Production Deployment Setup
For production, ensure your application runs in a stable environment.

#### Build the Application
```sh
npm run build
```

#### To test the build locally
```sh
npm run preview
```

#### Deploy on o2switch
1. Create a **Node.js application**
- **Node.js version**: `22`
- **Application startup file**: `loader_CJS_to_ESM.cjs`

2. **Upload the build files:**
- Copy the contents of the `dist` directory to the **Application root**.

3. **Install dependencies:**
- Click **Run NPM install** (from the o2switch panel).

4. **Start the application:**
- Click **START APP** (from the o2switch panel).

**📌 Note :**
Ensure your **environment variables** and **networking configurations** are properly set in the `.env` file.

### **2. 🎨 Badge Customization**
You can customize the badge appearance using URL parameters.

#### 🛠 Available Parameters
| Parameter |	Description |	Example
| -- | -- | -- |
| `owner` | Repository owner name | `owner=Sylvainxiii`
| `repo` | GitHub repository name | `repo=EasyUpload`
| `bg1`, `bg2` | Background colors (hex without #) | `bg1=ff0000` (red)
| `fg1`, `fg2` | Text colors (hex without #) | `fg1=ffffff` (white)
| `t1`, `t2` | Text displayed on the badge | `t1=TopList`

### **3. 📌 Usage Examples**

local test

#### 🎨 Badge with Custom Text

![tag](http://localhost:5001/api-v0/tag?owner=Sylvainxiii&repo=EasyUpload&t1=Top%20List&t2=Pull%20Request)

🔗 URL:
`http://localhost:5001/api-v0/tag?owner=Sylvainxiii&repo=EasyUpload&t1=Top%20List&t2=Pull%20Request`

#### 🎨 Badge with a Red Background

![tag](http://localhost:5001/api-v0/tag?bg2=ff0000&owner=Sylvainxiii&repo=EasyUpload&t1=TopList&t2=PullRequest)

🔗 URL:
`http://localhost:5001/api-v0/tag?bg2=ff0000&owner=Sylvainxiii&repo=EasyUpload&t1=TopList&t2=PullRequest`

#### 🎨 Badge with Custom Background and Text Colors

![tag](http://localhost:5001/api-v0/tag?fg2=000000&fg1=ff0000&bg2=0099ff&owner=Sylvainxiii&repo=EasyUpload&t1=TopList&t2=PullRequest&bg1=ffffff)

🔗 URL:
`http://localhost:5001/api-v0/tag?fg2=000000&fg1=ff0000&bg2=0099ff&owner=Sylvainxiii&repo=EasyUpload&t1=TopList&t2=PullRequest&bg1=ffffff`

---

badgeofhonor.dvpro.fr test

![tag](https://badgeofhonor.dvpro.fr/api-v0/tag?fg2=000000&fg1=0000ff&bg2=0099ff&owner=Sylvainxiii&repo=EasyUpload&t1=Top%20List&t2=Pull%20Request&bg1=FF7F50)

![tag](https://badgeofhonor.dvpro.fr/api-v0/tag?fg2=ffff00&fg1=ff0000&bg2=0000ff&owner=Sylvainxiii&repo=EasyUpload&t1=Top%20List&t2=Pull%20Request&bg1=00ff00)


![tag](https://badgeofhonor.dvpro.fr/api-v0/tag?fg2=000000&fg1=ffffff&bg2=FFBF00&owner=Sylvainxiii&repo=EasyUpload&t1=Top%20List&t2=Pull%20Request&bg1=000000)

## 📝 License
This project is licensed under the **MIT License**.
