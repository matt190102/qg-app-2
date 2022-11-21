import { useEffect, useState } from 'react'
import { Text, Button, StyleSheet, View, LayoutAnimation } from 'react-native'
import { getMainContext } from '../context/MainContext';
import { questionsList } from '../constants/Questions';
import React from 'react';
import { Bar } from 'react-native-progress';
import QuestionsQueue from '../components/QuestionsQueue';
const isRandom = true;
import { useNavigation } from "@react-navigation/native";
import TrackPlayer, { State } from 'react-native-track-player';
import NormalQuestion from '../components/NormalQuestion';
import MusicQuestion from '../components/MusicQuestion';

const IS_RANDOM = true;

export default function GameQuestion() {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState(questionsList.sort(() => !IS_RANDOM ? 0 : (Math.random() < 0.5 ? 1 : -1)));
  const [currentQuestionText, setcurrentQuestionText] = useState("");
  const [currentQuestion, setcurrentQuestion] = useState(questions[0]);
  const [currentDrink, setCurrentDrink] = useState("");
  const [menuShown, setMenuShown] = useState(false);
  const [progress, setProgress] = useState(0);
  const { players } = getMainContext();

  const nextQuestion = () => {
    setQuestions(questions.filter(q => q.text != questions[0].text));
    if (!questions[0]) {
      setProgress(1)
      setCurrentDrink("-")
      return setcurrentQuestionText("Plus de questions!")
    }
    setProgress((questionsList.length - questions.length) / questionsList.length);
    setCurrentDrink(questions[0].drinks ? questions[0].drinks.toString() : "-");
    setcurrentQuestion(questions[0]);
    setcurrentQuestionText(generateQuestion(questions[0].text, players));
  }

  const exit = () => navigation.goBack();


  useEffect(() => {
    nextQuestion();
    // setUpTrackPlayer();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={{ flex: 1 }}>
        <Bar progress={progress} width={200} color="purple" animated={true} />
      </View>
      {
        currentQuestion.song
          ?
          <MusicQuestion question={currentQuestion}></MusicQuestion>
          :
          <NormalQuestion currentDrink={currentDrink} currentQuestion={currentQuestionText}></NormalQuestion>
      }
      <View style={{ flex: 1 }}>
        <Button color={"purple"} disabled={menuShown} title="suivant" onPress={nextQuestion}></Button>
        <Button color={"purple"} disabled={menuShown} title="liste" onPress={() => setMenuShown(!menuShown)}></Button>
        <Button color={"purple"} disabled={menuShown} title="quitter" onPress={() => { TrackPlayer.reset(); exit() }}></Button>
      </View>

      <QuestionsQueue questions={questions} setQuestions={setQuestions} exit={() => setMenuShown(false)} shown={!menuShown}></QuestionsQueue>


    </View>
  )
}

function generateQuestion(question: string, players: string[]) {
  var tempPlayers: string[] = players;
  var vars = tempPlayers.sort(() => Math.random() < 0.5 ? 1 : -1);
  let count = 0;
  question = question.replace(/%player%/g, () => {
    if (vars[count] !== null) {
      var newQuestion = vars[count];
      count++;
      return newQuestion;
    } else return "%player%"
  });
  return question;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1d",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  miniTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  gameContainer: {
    flex: 3,
    backgroundColor: "#0000",
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%"
  },
  seperator: {
    height: 30
  }
});