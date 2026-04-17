function insert(v){
  document.getElementById('regexInput').value += v;
  generateStrings();
}

function clearAll(){
  document.getElementById('regexInput').value = '';
  document.getElementById('generated').innerHTML = 'Type a pattern to begin…';
  document.getElementById('count').textContent = '0 strings';
}

function updateLen(){
  document.getElementById('lenVal').textContent = document.getElementById('maxLen').value;
  generateStrings();
}

function generateStrings(){
  const pattern = document.getElementById('regexInput').value;
  const maxLen = parseInt(document.getElementById('maxLen').value);
  const out = document.getElementById('generated');

  try{
    const regex = new RegExp('^' + pattern + '$');
    let res = [];
    const chars = ['a','b','c'];

    function gen(s){
      if(s.length > maxLen) return;
      if(regex.test(s)) res.push(s);
      for(let ch of chars) gen(s + ch);
    }

    gen('');

    document.getElementById('count').textContent = res.length + ' strings';

    out.innerHTML = res.map((s,i)=>`${i+1}. " ${s || 'ε'} "`).join('<br>') || 'No matches';

  } catch {
    out.innerHTML = 'Invalid regex';
  }
}

function checkEquivalence(){
  const r1 = document.getElementById('regex1').value;
  const r2 = document.getElementById('regex2').value;
  const result = document.getElementById('result');

  try{
    const reg1 = new RegExp('^' + r1 + '$');
    const reg2 = new RegExp('^' + r2 + '$');

    const chars = ['a','b','c'];
    let same = true, tested = 0;

    function gen(s){
      if(s.length > 5) return;
      tested++;
      if(reg1.test(s) !== reg2.test(s)) same = false;
      for(let ch of chars) gen(s + ch);
    }

    gen('');

    result.textContent = same 
      ? `✔ Likely equivalent (tested ${tested} strings)`
      : `✘ Not equivalent`;

  } catch {
    result.textContent = 'Invalid input';
  }
}