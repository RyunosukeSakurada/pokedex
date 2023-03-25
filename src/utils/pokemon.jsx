export const getAllPokemon = (url) => {
  //非同期処理
  return new Promise((resolve,reject) => {
    //Promise関数は約束すること = 何を = fetchが完了するまで待つこと
    fetch(url)//データを取得する
    .then((res) => res.json()) //データをresで受け取ってJSON形式にする
    .then((data) => resolve(data));//JSON形式化したものをdataとして受け取る.resolve関数にdataを引数で渡すことでreturnでJSON形式のものを返す
  });
};
export const getPokemon = (url) => {
  //非同期処理
  return new Promise((resolve,reject) => {
    //Promise関数は約束すること = 何を = fetchが完了するまで待つこと
    fetch(url)//データを取得する
    .then((res) => res.json()) //データをresで受け取ってJSON形式にする
    .then((data) => {
      console.log(data);
      resolve(data);
    });//JSON形式化したものをdataとして受け取る.resolve関数にdataを引数で渡すことでreturnでJSON形式のものを返す
  });
};
