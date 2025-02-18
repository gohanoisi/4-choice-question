// ページ読み込み時に、problem.jsonからファイル名一覧を取得し、ドロップダウンを生成
window.addEventListener('DOMContentLoaded', () => {
  fetch('problem.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('problem.json が見つかりません');
      }
      return response.json();
    })
    .then(data => {
      populateSelector(data.files);
    })
    .catch(error => {
      console.error('エラー:', error);
      alert('問題セット一覧の読み込みに失敗しました');
    });
});

// ドロップダウンに option を追加する関数
function populateSelector(files) {
  const selector = document.getElementById('json-selector');
  files.forEach(filename => {
    const option = document.createElement('option');
    option.value = filename;
    option.textContent = filename;
    selector.appendChild(option);
  });
}

// 「読み込む」ボタンがクリックされたときの処理
document.getElementById('load-btn').addEventListener('click', () => {
  const selector = document.getElementById('json-selector');
  const filename = selector.value;
  if (filename) {
    loadQuiz(filename);
  } else {
    alert('問題セットを選択してください');
  }
});

// 選択されたJSONファイルから問題データを読み込み
function loadQuiz(jsonFile) {
  fetch(jsonFile)
    .then(response => {
      if (!response.ok) {
        throw new Error('JSONファイルが見つかりません: ' + jsonFile);
      }
      return response.json();
    })
    .then(data => {
      renderQuiz(data);
    })
    .catch(error => {
      console.error('エラー:', error);
      alert('問題の読み込みに失敗しました');
    });
}

// 読み込んだ問題データを画面に表示する処理
function renderQuiz(data) {
  const container = document.getElementById('quiz-container');
  // 前回の問題があればクリア
  container.innerHTML = '';

  data.chapters.forEach(chapter => {
    // 章用のコンテナ作成
    const chapterDiv = document.createElement('div');
    chapterDiv.classList.add('chapter');

    // 章タイトル
    const chapterTitle = document.createElement('div');
    chapterTitle.classList.add('chapter-title');
    chapterTitle.textContent = chapter.title;
    chapterDiv.appendChild(chapterTitle);

    // 各問題の生成
    chapter.questions.forEach(q => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');

      // 問題文
      const questionTitle = document.createElement('div');
      questionTitle.classList.add('question-title');
      questionTitle.textContent = `問題${q.id}: ${q.question}`;
      questionDiv.appendChild(questionTitle);

      // 選択肢リスト
      const optionsList = document.createElement('div');
      optionsList.classList.add('options');
      q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = `${index + 1}: ${option}`;
        optionsList.appendChild(optionDiv);
      });
      questionDiv.appendChild(optionsList);

      // 「回答を表示」ボタンの作成
      const toggleButton = document.createElement('button');
      toggleButton.textContent = '回答を表示';
      questionDiv.appendChild(toggleButton);

      // 回答部分（初期は隠す）
      const answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');

      // 回答と解説の生成（解説は改行ごとに分割して<p>タグで表示）
      let answerHtml = `<p>回答: ${q.answer}</p>`;
      if (q.explanation) {
        answerHtml += `<div class="explanation"><p>説明:</p>`;
        const lines = q.explanation.split('\n');
        lines.forEach(line => {
          if (line.trim() !== '') {
            answerHtml += `<p>${line}</p>`;
          }
        });
        answerHtml += `</div>`;
      }
      answerDiv.innerHTML = answerHtml;
      questionDiv.appendChild(answerDiv);

      // ボタンをクリックしたら、回答部分の表示／非表示を切り替え、ボタンの表示テキストも更新
      toggleButton.addEventListener('click', () => {
        answerDiv.classList.toggle('revealed');
        if (answerDiv.classList.contains('revealed')) {
          toggleButton.textContent = '回答を非表示';
        } else {
          toggleButton.textContent = '回答を表示';
        }
      });

      chapterDiv.appendChild(questionDiv);
    });

    container.appendChild(chapterDiv);
  });
}
