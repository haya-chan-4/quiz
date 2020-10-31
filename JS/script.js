'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    {q: '赤はフランス語で?', c: ['rouge', 'rose', 'vert', 'violet']},
    {q: '日本の首都は?', c: ['東京', '京都', '神奈川', '愛知']},
    {q: '最新iPhoneのナンバリングは?', c: ['12', '11', '13', '20']},
    {q: '日本で選挙権が与えられる年齢は?', c: ['18', '22', '15', '20']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered) {
      return;
    }
    isAnswered = true;
    if(li.textContent === quizSet[currentNum].c[0]){
      score++;
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuestion () {
    isAnswered = false;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    question.textContent = quizSet[currentNum].q;

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });
    if(currentNum === quizSet.length - 1){
      btn.textContent = 'Show Score';
    }
  }


  setQuestion();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1){
      // console.log(`Score: ${score} / ${quizSet.length}`)
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;

      result.classList.remove('hidden');

    } else {
      currentNum ++;
      setQuestion();
    }

  })
}