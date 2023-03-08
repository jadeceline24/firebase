import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
import {useEffect, useState} from 'react';
import './App.css';
import {Auth} from './components/auth';
import {db, auth, storage} from './config/firebase';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const moviesCollectionRef = collection(db, 'movies');

  //Update title
  const [newTitle, setNewTitle] = useState('');

  //File State
  const [fileupload, setfileupload] = useState(null);

  const getMovieList = async () => {
    //Read the data
    //set the movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        yearRelease: newReleaseDate,
        awards: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {}
  };
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await deleteDoc(movieDoc);
    } catch (error) {}
  };

  const updatedTitle = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await updateDoc(movieDoc, {title: newTitle});
    } catch (error) {}
  };
  const fileUploaded = async () => {
    try {
      if (!fileupload) {
        return;
      } else {
        const projectref = ref(storage, `projectfiles/${fileupload.name}`);
        await uploadBytes(projectref, fileupload);
      }
    } catch (error) {}
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>
      <div className="">
        {movieList.map((movie) => (
          <div className="">
            <h1>{movie.title}</h1>
            <h1>{movie.yearRelease}</h1>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="New Movie Title..."
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={() => updatedTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div className="">
        <input
          type="file"
          placeholder="Movie title..."
          onChange={(e) => setfileupload(e.target.files[0])}
        />
        <button onClick={fileUploaded}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
