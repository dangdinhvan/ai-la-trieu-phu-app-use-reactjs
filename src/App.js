import './App.css';
import { useState, useRef, useEffect } from "react";
import logo from "./images/ai-la-trieu-phu-logo.png";
import anhBacSam from "./images/anh-bac-sam.jpg";
import help_5050 from "./images/help-50-50.png";
import help_5050_disable from "./images/help-50-50-disable.png";
import help_ask_the_spectator_img from "./images/hoi-y-kien-khan-gia.png";
import help_ask_the_spectator_disable_img from "./images/hoi-y-kien-khan-gia-disable.png";
import { Howl, Howler } from "howler";

const DATA = [
  {
    id: "1",
    question: "Tục ngữ có câu: Gần mực thì đen gần đèn thì...",
    answerA: "A: Tối",
    answerB: "B: Vẫn thế",
    answerC: "C: Chói",
    answerD: "D: Sáng",
    answerCorrect: "D: Sáng"
  },
  {
    id: "2",
    question: "Một trận đấu bóng đá thì gồm có bao nhiêu cầu thủ?",
    answerA: "A: 22",
    answerB: "B: 18",
    answerC: "C: 20",
    answerD: "D: 24",
    answerCorrect: "A: 22"
  },
  {
    id: "3",
    question: "Con vật nào sau đây không có trong 12 con giáp?",
    answerA: "A: Trâu",
    answerB: "B: Hổ",
    answerC: "C: Rồng",
    answerD: "D: Báo",
    answerCorrect: "D: Báo"
  },
  {
    id: "4",
    question: "Năm 1500 thuộc thế kỷ thứ bao nhiêu?",
    answerA: "A: 14",
    answerB: "B: 15",
    answerC: "C: 16",
    answerD: "D: 17",
    answerCorrect: "B: 15"
  },
  {
    id: "5",
    question: `Đất nước nào được mệnh danh là "Đảo quốc sương mù"?`,
    answerA: "A: Singapore",
    answerB: "B: Đức",
    answerC: "C: Anh",
    answerD: "D: Peru",
    answerCorrect: "C: Anh"
  },
  {
    id: "6",
    question: "Tính đến năm 8/2021 ai là cầu thủ sở hữu nhiều danh hiệu Quả bóng vàng nhất?",
    answerA: "A: Diego Maradona",
    answerB: "B: Ronaldinho",
    answerC: "C: Cristiano Ronaldo",
    answerD: "D: Lionel Messi",
    answerCorrect: "D: Lionel Messi"
  },
  {
    id: "7",
    question: "Tục ngữ có câu: Ao sâu tốt cá, nước cả cá...",
    answerA: "A: Bé",
    answerB: "B: To",
    answerC: "C: Bơi nhanh",
    answerD: "D: Lặn",
    answerCorrect: "B: To"
  },
  {
    id: "8",
    question: "Đơn vị tiền tệ của I-ta-li-a là gì?",
    answerA: "A: Peso",
    answerB: "B: Baht",
    answerC: "C: Rupiah",
    answerD: "D: Euro",
    answerCorrect: "D: Euro"
  },
  {
    id: "9",
    question: "Ấn Độ là quốc gia có dân số đứng thứ mấy thế giới?",
    answerA: "A: Thứ 10",
    answerB: "B: Thứ 2",
    answerC: "C: Thứ 9",
    answerD: "D: Thứ 5",
    answerCorrect: "B: Thứ 2"
  },
  {
    id: "10",
    question: "Tổng thống đời thứ 16 của Mỹ là ai?",
    answerA: "A: Abraham Lincoln",
    answerB: "B: John Adams",
    answerC: "C: John F. Kennedy",
    answerD: "D: Richard Nixon",
    answerCorrect: "A: Abraham Lincoln"
  },
  {
    id: "11",
    question: "Năm 2014 đã bùng phát đại dịch nào sau đây?",
    answerA: "A: Đại dịch hạch London",
    answerB: "B: Đại dịch cúm",
    answerC: "C: Đại dịch Ebola",
    answerD: "D: Đại dịch tả",
    answerCorrect: "C: Đại dịch Ebola"
  },
  {
    id: "12",
    question: "Diễn viên lồng tiếng cho nhân vật Groot trong phim Vệ binh giải ngân hà là ai?",
    answerA: "A: Chris Pratt",
    answerB: "B: Vin Diesel",
    answerC: "C: Leonardo DiCaprio",
    answerD: "D: James Gunn",
    answerCorrect: "B: Vin Diesel"
  },
  {
    id: "13",
    question: "Bộ phim Titanic được công chiếu lần đầu vào năm nào?",
    answerA: "A: 1997",
    answerB: "B: 1995",
    answerC: "C: 1996",
    answerD: "D: 1998",
    answerCorrect: "A: 1997"
  },
  {
    id: "14",
    question: "Tóa tháp cao nhât thế giới Burj Khalifa cao bao nhiêu mét?",
    answerA: "A: 850m",
    answerB: "B: 832m",
    answerC: "C: 819m",
    answerD: "D: 828m",
    answerCorrect: "D: 828m"
  },
  {
    id: "15",
    question: "Ký tự duy nhất không xuất hiện trong bảng tuần hoàn các nguyên tố hóa học là gì?",
    answerA: "A: R",
    answerB: "B: U",
    answerC: "C: J",
    answerD: "D: Z",
    answerCorrect: "C: J"
  },
];


let answerTemp = "";
function App() {
  const [startPage, setStartPage] = useState(true);
  const [mainPage, setMainPage] = useState(false);
  const [nextBtnHtml, setNextBtnHtml] = useState("Câu kế tiếp");
  const [questionCount, setQuestionCount] = useState(0);
  const [confirmBtnState, setConfirmBtnState] = useState(true);
  const [nextBtnState, setNextBtnState] = useState(true);
  const [answerAState, setAnswerAState] = useState(false);
  const [answerBState, setAnswerBState] = useState(false);
  const [answerCState, setAnswerCState] = useState(false);
  const [answerDState, setAnswerDState] = useState(false);
  const [help5050State, setHelp5050State] = useState(true);
  const [help5050Img, setHelp5050Img] = useState(help_5050);
  const [question1, setQuestion1] = useState({
    backgroundColor: "#ffc919",
    color: "#222"
  });
  const [question2, setQuestion2] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question3, setQuestion3] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question4, setQuestion4] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question5, setQuestion5] = useState({
    backgroundColor: "transparent",
    color: "white"
  });
  const [question6, setQuestion6] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question7, setQuestion7] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question8, setQuestion8] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question9, setQuestion9] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question10, setQuestion10] = useState({
    backgroundColor: "transparent",
    color: "white"
  });
  const [question11, setQuestion11] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question12, setQuestion12] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question13, setQuestion13] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question14, setQuestion14] = useState({
    backgroundColor: "transparent",
    color: "#edbc1a"
  });
  const [question15, setQuestion15] = useState({
    backgroundColor: "transparent",
    color: "white"
  });
  const [bountyValue, setBountyValue] = useState("0");
  const [helpAskTheSpectatorImg, setHelpAskTheSpectatorImg] = useState(
    help_ask_the_spectator_img
  );

  const answerA = useRef(null);
  const answerB = useRef(null);
  const answerC = useRef(null);
  const answerD = useRef(null);
  const percentValidA = useRef(0);
  const percentValidB = useRef(0);
  const percentValidC = useRef(0);
  const percentValidD = useRef(0);
  const askTheSpectator = useRef(null);
  const newArrIncorrect = useRef([]);

  let content = [];

  let amThanhKhiTraLoi = new Howl({
    src: ["/sounds/am-thanh-khi-tra-loi-first.mp3"],
    loop: true,
    html5: true,
    volume: 0.5
  });
  let amThanhKhiChon = new Howl({
    src: ["/sounds/am-thanh-khi-chon.mp3"],
    loop: false,
    html5: true
  });
  let amThanhTraloiDung = new Howl({
    src: ["/sounds/am-thanh-tra-loi-dung.mp3"],
    loop: false,
    html5: true
  });
  let amThanhTraLoiSai = new Howl({
    src: ["/sounds/am-thanh-tra-loi-sai.mp3"],
    loop: false,
    html5: true
  });
  let amThanh5050 = new Howl({
    src: ["/sounds/am-thanh-5050.mp3"],
    loop: false,
    html5: true,
  });
  let amThanhKhiHoiKhanGia = new Howl({
    src: ["/sounds/am-thanh-khi-hoi-y-kien-khan-gia.mp3"],
    loop: false,
    html5: true
  });

  const intoTheGame = () => {
    setStartPage(false);
    setMainPage(true);
    amThanhKhiTraLoi.play();
  };

  const exitBtn = () => {
    setStartPage(true);
    setMainPage(false);
    setQuestionCount(0);
    setNextBtnHtml("Câu kế tiêp");
    setHelp5050State(true);
    setHelp5050Img(help_5050);
    setQuestion1({ backgroundColor: "#ffc919", color: "#222" });
    setQuestion2({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion3({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion4({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion5({ backgroundColor: "transparent", color: "white" });
    setQuestion6({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion7({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion8({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion9({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion10({ backgroundColor: "transparent", color: "white" });
    setQuestion11({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion12({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion13({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion14({ backgroundColor: "transparent", color: "#edbc1a" });
    setQuestion15({ backgroundColor: "transparent", color: "white" });
    setHelpAskTheSpectatorImg(help_ask_the_spectator_img);
    newArrIncorrect.current = [];
    percentValidA.current = 0;
    percentValidB.current = 0;
    percentValidC.current = 0;
    percentValidD.current = 0;
    Howler.stop();
  };

  const confirmBtn = () => {
    if (DATA[questionCount].answerA === DATA[questionCount].answerCorrect) {
      answerA.current.style.animation = "nhap-nhay 0.3s linear infinite";
    } else if (
      DATA[questionCount].answerB === DATA[questionCount].answerCorrect
    ) {
      answerB.current.style.animation = "nhap-nhay 0.3s linear infinite";
    } else if (
      DATA[questionCount].answerC === DATA[questionCount].answerCorrect
    ) {
      answerC.current.style.animation = "nhap-nhay 0.3s linear infinite";
    } else if (
      DATA[questionCount].answerD === DATA[questionCount].answerCorrect
    ) {
      answerD.current.style.animation = "nhap-nhay 0.3s linear infinite";
    }
    if (answerTemp === DATA[questionCount].answerCorrect) {
      amThanhTraloiDung.play();
      setNextBtnState(false);
    } else {
      amThanhTraLoiSai.play();
      setTimeout(() => {
        setMainPage(false);
      }, 2500);
    }
  };

  const nextBtn = () => {
    answerA.current.style.background = "#2359b6";
    answerA.current.style.color = "rgb(255, 232, 98)";
    answerB.current.style.background = "#2359b6";
    answerB.current.style.color = "rgb(255, 232, 98)";
    answerC.current.style.background = "#2359b6";
    answerC.current.style.color = "rgb(255, 232, 98)";
    answerD.current.style.background = "#2359b6";
    answerD.current.style.color = "rgb(255, 232, 98)";
    answerA.current.style.animation = "";
    answerB.current.style.animation = "";
    answerC.current.style.animation = "";
    answerD.current.style.animation = "";
    if (questionCount === content.length - 2) {
      setNextBtnHtml("kết thúc");
    } else if (questionCount > content.length - 2) {
      setMainPage(false);
    }
    setQuestionCount(questionCount + 1);
    setConfirmBtnState(true);
    setNextBtnState(true);
    setAnswerAState(false);
    setAnswerBState(false);
    setAnswerCState(false);
    setAnswerDState(false);
    askTheSpectator.current.style.display = "none";
    newArrIncorrect.current = [];

    if (questionCount === 0) {
      setQuestion2({ backgroundColor: "#ffc919", color: "black" });
      setQuestion1({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("200.000");
    } else if (questionCount === 1) {
      setQuestion3({ backgroundColor: "#ffc919", color: "black" });
      setQuestion2({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("400.000");
    } else if (questionCount === 2) {
      setQuestion4({ backgroundColor: "#ffc919", color: "black" });
      setQuestion3({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("600.000");
    } else if (questionCount === 3) {
      setQuestion5({ backgroundColor: "#ffc919", color: "black" });
      setQuestion4({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("1.000.000");
    } else if (questionCount === 4) {
      setQuestion6({ backgroundColor: "#ffc919", color: "black" });
      setQuestion5({ backgroundColor: "transparent", color: "white" });
      setBountyValue("2.000.000");
    } else if (questionCount === 5) {
      setQuestion7({ backgroundColor: "#ffc919", color: "black" });
      setQuestion6({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("3.000.000");
    } else if (questionCount === 6) {
      setQuestion8({ backgroundColor: "#ffc919", color: "black" });
      setQuestion7({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("6.000.000");
    } else if (questionCount === 7) {
      setQuestion9({ backgroundColor: "#ffc919", color: "black" });
      setQuestion8({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("10.000.000");
    } else if (questionCount === 8) {
      setQuestion10({ backgroundColor: "#ffc919", color: "black" });
      setQuestion9({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("14.000.000");
    } else if (questionCount === 9) {
      setQuestion11({ backgroundColor: "#ffc919", color: "black" });
      setQuestion10({ backgroundColor: "transparent", color: "white" });
      setBountyValue("22.000.000");
    } else if (questionCount === 10) {
      setQuestion12({ backgroundColor: "#ffc919", color: "black" });
      setQuestion11({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("30.000.000");
    } else if (questionCount === 11) {
      setQuestion13({ backgroundColor: "#ffc919", color: "black" });
      setQuestion12({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("40.000.000");
    } else if (questionCount === 12) {
      setQuestion14({ backgroundColor: "#ffc919", color: "black" });
      setQuestion13({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("60.000.000");
    } else if (questionCount === 13) {
      setQuestion15({ backgroundColor: "#ffc919", color: "black" });
      setQuestion14({ backgroundColor: "transparent", color: "#edbc1a" });
      setBountyValue("85.000.000");
    } else if (questionCount > 13) {
      setBountyValue("150.000.000");
    }
  };

  const help5050 = () => {
    amThanh5050.play();
    if (help5050State === true) {
      let arrIncorrect = [];
      if (DATA[questionCount].answerA !== DATA[questionCount].answerCorrect) {
        arrIncorrect.push(DATA[questionCount].answerA);
      }
      if (DATA[questionCount].answerB !== DATA[questionCount].answerCorrect) {
        arrIncorrect.push(DATA[questionCount].answerB);
      }
      if (DATA[questionCount].answerC !== DATA[questionCount].answerCorrect) {
        arrIncorrect.push(DATA[questionCount].answerC);
      }
      if (DATA[questionCount].answerD !== DATA[questionCount].answerCorrect) {
        arrIncorrect.push(DATA[questionCount].answerD);
      }
      let incorrectItem =
        arrIncorrect[Math.floor(Math.random() * arrIncorrect.length)];

      for (let i = 0; i < arrIncorrect.length; i++) {
        if (arrIncorrect[i] !== incorrectItem) {
          newArrIncorrect.current.push(arrIncorrect[i]);
        }
      }

      for (let i = 0; i < newArrIncorrect.current.length; i++) {
        if (DATA[questionCount].answerA === newArrIncorrect.current[i]) {
          answerA.current.style.color = "#2359b6";
          answerA.current.style.background = "#2359b6";
          setAnswerAState(true);
        }
        if (DATA[questionCount].answerB === newArrIncorrect.current[i]) {
          answerB.current.style.color = "#2359b6";
          answerB.current.style.background = "#2359b6";
          setAnswerBState(true);
        }
        if (DATA[questionCount].answerC === newArrIncorrect.current[i]) {
          answerC.current.style.color = "#2359b6";
          answerC.current.style.background = "#2359b6";
          setAnswerCState(true);
        }
        if (DATA[questionCount].answerD === newArrIncorrect.current[i]) {
          answerD.current.style.color = "#2359b6";
          answerD.current.style.background = "#2359b6";
          setAnswerDState(true);
        }
        setHelp5050State(false);
      }
    } else {
      return;
    }
    setHelp5050Img(help_5050_disable);
  };

  const helpAskTheSpectator = () => {
    amThanhKhiHoiKhanGia.play();
    askTheSpectator.current.style.display = "flex";
    setHelpAskTheSpectatorImg(help_ask_the_spectator_disable_img);
    console.log(newArrIncorrect);

    let percentValidATemp = 1;
    let percentValidBTemp = 1;
    let percentValidCTemp = 1;
    let percentValidDTemp = 1;

    if (newArrIncorrect.current.length !== 0) {
      for (let i = 0; i < newArrIncorrect.current.length; i++) {
        if (
          newArrIncorrect.current[i] === DATA[questionCount].answerA ||
          percentValidATemp === 0
        ) {
          percentValidATemp = 0;
        } else {
          percentValidATemp = Math.round(Math.random() * 55);
        }
        if (
          newArrIncorrect.current[i] === DATA[questionCount].answerB ||
          percentValidDTemp === 0
        ) {
          percentValidBTemp = 0;
        } else {
          percentValidBTemp = Math.round(
            Math.random() * (55 - percentValidATemp)
          );
        }
        if (
          newArrIncorrect.current[i] === DATA[questionCount].answerC ||
          percentValidDTemp === 0
        ) {
          percentValidCTemp = 0;
        } else {
          percentValidCTemp = Math.round(
            Math.random() * (55 - percentValidATemp - percentValidBTemp)
          );
        }
        if (
          newArrIncorrect.current[i] === DATA[questionCount].answerD ||
          percentValidDTemp === 0
        ) {
          percentValidDTemp = 0;
        } else {
          percentValidDTemp =
            55 - percentValidATemp - percentValidBTemp - percentValidCTemp;
        }
      }

      percentValidA.current = percentValidATemp;
      percentValidB.current = percentValidBTemp;
      percentValidC.current = percentValidCTemp;
      percentValidD.current = percentValidDTemp;
    } else {
      percentValidA.current = Math.round(Math.random() * 55);
      percentValidB.current = Math.round(
        Math.random() * (55 - percentValidA.current)
      );
      percentValidC.current = Math.round(
        Math.random() * (55 - percentValidA.current - percentValidB.current)
      );
      percentValidD.current =
        55 -
        percentValidA.current -
        percentValidB.current -
        percentValidC.current;
    }

    if (DATA[questionCount].answerA === DATA[questionCount].answerCorrect) {
      percentValidA.current += 45;
    } else if (
      DATA[questionCount].answerB === DATA[questionCount].answerCorrect
    ) {
      percentValidB.current += 45;
    } else if (
      DATA[questionCount].answerC === DATA[questionCount].answerCorrect
    ) {
      percentValidC.current += 45;
    } else if (
      DATA[questionCount].answerD === DATA[questionCount].answerCorrect
    ) {
      percentValidD.current += 45;
    }
  };

  for (let i = 0; i < DATA.length; i++) {
    content.push(
      <div id="container">
        <div id="question-answers">
          <div id="timer-img">
            <div id="show-timer"></div>
            <img src={anhBacSam} alt="anh-mc" />
            <div id="ask-the-spectator-box">
              <div id="ask-the-spectator" ref={askTheSpectator}>
                <div className="percent-answer-column">
                  <div className="percent-value">{percentValidA.current}%</div>
                  <div className="percent-chart">
                    <div
                      className="percent-valid"
                      style={{ height: percentValidA.current }}
                    ></div>
                  </div>
                  <div className="column-title">A</div>
                </div>
                <div className="percent-answer-column">
                  <div className="percent-value">{percentValidB.current}%</div>
                  <div className="percent-chart">
                    <div
                      className="percent-valid"
                      style={{ height: percentValidB.current }}
                    ></div>
                  </div>
                  <div className="column-title">B</div>
                </div>
                <div className="percent-answer-column">
                  <div className="percent-value">{percentValidC.current}%</div>
                  <div className="percent-chart">
                    <div
                      className="percent-valid"
                      style={{ height: percentValidC.current }}
                    ></div>
                  </div>
                  <div className="column-title">C</div>
                </div>
                <div className="percent-answer-column">
                  <div className="percent-value">{percentValidD.current}%</div>
                  <div className="percent-chart">
                    <div
                      className="percent-valid"
                      style={{ height: percentValidD.current }}
                    ></div>
                  </div>
                  <div className="column-title">D</div>
                </div>
              </div>
            </div>
          </div>
          <div id="question">
            <div className="hai-ben">
              <div className="tren" />
              <div className="duoi" />
            </div>
            <div id="content-question">{DATA[i].question}</div>
            <div className="hai-ben">
              <div className="tren" />
              <div className="duoi" />
            </div>
          </div>
          <div id="answers">
            <div className="line">
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
              <button
                id="A"
                onClick={() => choice("a")}
                ref={answerA}
                className="content-answer"
                disabled={answerAState}
              >
                {DATA[i].answerA}
              </button>
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
              <button
                id="B"
                onClick={() => choice("b")}
                ref={answerB}
                className="content-answer"
                disabled={answerBState}
              >
                {DATA[i].answerB}
              </button>
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
            </div>
            <div className="line">
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
              <button
                id="C"
                onClick={() => choice("c")}
                ref={answerC}
                className="content-answer"
                disabled={answerCState}
              >
                {DATA[i].answerC}
              </button>
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
              <button
                id="D"
                onClick={() => choice("d")}
                ref={answerD}
                className="content-answer"
                disabled={answerDState}
              >
                {DATA[i].answerD}
              </button>
              <div className="space">
                <div className="tren" />
                <div className="duoi" />
              </div>
            </div>
          </div>
          <div id="select">
            <button className="button" onClick={exitBtn}>
              Thoát Game
            </button>
            <button
              className="button"
              onClick={confirmBtn}
              disabled={confirmBtnState}
            >
              Xác nhận câu trả lời
            </button>
            <button
              className="button"
              onClick={nextBtn}
              disabled={nextBtnState}
            >
              {nextBtnHtml}
            </button>
          </div>
        </div>
        <div id="process">
          <div id="helps">
            <div className="help" onClick={help5050}>
              <img src={help5050Img} alt="help-5050" />
            </div>
            <div className="help" onClick={helpAskTheSpectator}>
              <img src={helpAskTheSpectatorImg} alt="help-ask-spectator" />
            </div>
          </div>
          <div id="total-question">
            <div
              className="question-of-process"
              style={{ backgroundColor: question15.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question15.color }}
              >
                15
              </div>
              <div id="bounty" style={{ color: question15.color }}>
                150.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question14.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question14.color }}
              >
                14
              </div>
              <div id="bounty" style={{ color: question14.color }}>
                85.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question13.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question13.color }}
              >
                13
              </div>
              <div id="bounty" style={{ color: question13.color }}>
                60.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question12.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question12.color }}
              >
                12
              </div>
              <div id="bounty" style={{ color: question12.color }}>
                40.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question11.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question11.color }}
              >
                11
              </div>
              <div id="bounty" style={{ color: question11.color }}>
                30.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question10.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question10.color }}
              >
                10
              </div>
              <div id="bounty" style={{ color: question10.color }}>
                22.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question9.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question9.color }}
              >
                9
              </div>
              <div id="bounty" style={{ color: question9.color }}>
                14.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question8.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question8.color }}
              >
                8
              </div>
              <div id="bounty" style={{ color: question8.color }}>
                10.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question7.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question7.color }}
              >
                7
              </div>
              <div id="bounty" style={{ color: question7.color }}>
                6.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question6.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question6.color }}
              >
                6
              </div>
              <div id="bounty" style={{ color: question6.color }}>
                3.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question5.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question5.color }}
              >
                5
              </div>
              <div id="bounty" style={{ color: question5.color }}>
                2.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question4.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question4.color }}
              >
                4
              </div>
              <div id="bounty" style={{ color: question4.color }}>
                1.000.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question3.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question3.color }}
              >
                3
              </div>
              <div id="bounty" style={{ color: question3.color }}>
                600.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question2.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question2.color }}
              >
                2
              </div>
              <div id="bounty" style={{ color: question2.color }}>
                400.000
              </div>
            </div>
            <div
              className="question-of-process"
              style={{ backgroundColor: question1.backgroundColor }}
            >
              <div
                className="question-number"
                style={{ color: question1.color }}
              >
                1
              </div>
              <div id="bounty" style={{ color: question1.color }}>
                200.000
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const choice = (input) => {
    amThanhKhiChon.play();
    if (input === "a") {
      answerA.current.style.background = "#dbac4b";
      answerA.current.style.color = "white";
      answerTemp = DATA[questionCount].answerA;
      answerB.current.style.background = "#2359b6";
      answerB.current.style.color = "rgb(255, 232, 98)";
      answerC.current.style.background = "#2359b6";
      answerC.current.style.color = "rgb(255, 232, 98)";
      answerD.current.style.background = "#2359b6";
      answerD.current.style.color = "rgb(255, 232, 98)";
    } else if (input === "b") {
      answerB.current.style.background = "#dbac4b";
      answerB.current.style.color = "white";
      answerTemp = DATA[questionCount].answerB;
      answerA.current.style.background = "#2359b6";
      answerA.current.style.color = "rgb(255, 232, 98)";
      answerC.current.style.background = "#2359b6";
      answerC.current.style.color = "rgb(255, 232, 98)";
      answerD.current.style.background = "#2359b6";
      answerD.current.style.color = "rgb(255, 232, 98)";
    } else if (input === "c") {
      answerC.current.style.background = "#dbac4b";
      answerC.current.style.color = "white";
      answerTemp = DATA[questionCount].answerC;
      answerB.current.style.background = "#2359b6";
      answerB.current.style.color = "rgb(255, 232, 98)";
      answerA.current.style.background = "#2359b6";
      answerA.current.style.color = "rgb(255, 232, 98)";
      answerD.current.style.background = "#2359b6";
      answerD.current.style.color = "rgb(255, 232, 98)";
    } else if (input === "d") {
      answerD.current.style.background = "#dbac4b";
      answerD.current.style.color = "white";
      answerTemp = DATA[questionCount].answerD;
      answerB.current.style.background = "#2359b6";
      answerB.current.style.color = "rgb(255, 232, 98)";
      answerC.current.style.background = "#2359b6";
      answerC.current.style.color = "rgb(255, 232, 98)";
      answerA.current.style.background = "#2359b6";
      answerA.current.style.color = "rgb(255, 232, 98)";
    }
    if (answerAState === true) {
      answerA.current.style.color = "#2359b6";
      answerA.current.style.background = "#2359b6";
    }
    if (answerBState === true) {
      answerB.current.style.color = "#2359b6";
      answerB.current.style.background = "#2359b6";
    }
    if (answerCState === true) {
      answerC.current.style.color = "#2359b6";
      answerC.current.style.background = "#2359b6";
    }
    if (answerDState === true) {
      answerD.current.style.color = "#2359b6";
      answerD.current.style.background = "#2359b6";
    }
    setConfirmBtnState(false);
  };

  return startPage ? (
    <div id="start">
      <img src={logo} alt="anh logo" />
      <button className="play-again" onClick={intoTheGame}>
        Start
      </button>
    </div>
  ) : mainPage ? (
    content[questionCount]
  ) : (
    <div id="end-game">
      <h1>Game Over</h1>
      <p>Phần thưởng của bạn là {bountyValue} VND</p>
      <button className="play-again" onClick={exitBtn}>
        Chơi lại
      </button>
    </div>
  );
}

export default App;
