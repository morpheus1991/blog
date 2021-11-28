import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

//Routes
import postsRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";

const app = express();
const { MONGO_URI } = config;

app.use(hpp()); //보안라이브러리
app.use(helmet()); //보안라이브러리

app.use(
  cors({
    origin: true, //모두 허용,
    credentials: true, //cors설정 브라우저 헤더에 추가
  })
);
app.use(morgan("dev")); //개발시 로그 확인
app.use(express.json()); //브라우저에서 보낸 내용(body) json으로 해석,

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    //connect 의 인자로 { useNewUrlParser: true } 를 적지 않으면 deprecatedError 가 발생한다.
    //경고 메세지가 나오는게 보기 싫어 구글링을 통해 위의 코드를 작성
    useUnifiedTopology: true,
    //mongoose의 드라이버와 MongoDB의 드라이버는 useUnifiedTopology: true 옵션값을 통하여
    // 같은 소켓에서 데이터가 왔다갔다 할 수 있다
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting Success!"))
  .catch((e) => console.log(e));

//Use routes
app.get("/");
app.use("/api/post", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
