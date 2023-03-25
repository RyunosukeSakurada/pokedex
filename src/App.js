import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon} from './utils/pokemon';

function App() {
  //APIのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //データ読み込み時のローディング画面
  const [loading,setLoading] = useState(true);

  //pokemondataをscopeの外で宣言したからそれを格納するための状態変数を用意
  const [pokemonData, setPokemonData] = useState([]);

  const [nextURL, setNextURL] = useState([])
  const [prevURL, setPrevURL] = useState([])

  //ページをロードした時に情報を一回取得する = useEffectかつ空の配列
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //↑getAllPokemon()という関数をまだ作ってないからutilsっていうフォルダーを用意してその中のJSファイルで関数を作る
      //↓各ポケモンの詳細なデータを取得する
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous); //null
      setLoading(false) //APIのデータが読み込まれた時点でローディングは終了
    };
    fetchPokemonData();
  },[]);

  //res.resultsという引数をdataとして受け取る
  const loadPokemon = async (data) => {
    //promise.all : 複数のPromise関数を実行して、そのPromise関数の全ての結果を取得することができる
    let _pokemonData = await Promise.all(
      //そのデータ一つ一つを展開し、その一つをpokemonって名前にする
      data.map((pokemon) => {
        //欲しいのはそのpokemonの中にあるurl.それを取り出す関数をgetPokemonとしpokemonRecordと定義
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };


  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  } 

  const handlePrevPage = async() => {
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }


  return (
    <>
      <Navbar />
      <div className="App">
        {/* loadingのtrue/falseでHTMLの記述を変える = 三項演算式 */}
        {loading ? (
          <h1>Loading...</h1>
        ): (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon,i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
        )}
      </div>
    </>
  );
}

export default App;
