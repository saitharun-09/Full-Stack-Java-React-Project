import Header from './Header.jsx';
import '../App.css'
import Card from './Card.jsx';
import HP1 from '../Assets/download.jpeg';
import HP2 from '../Assets/download (1).jpeg';

function WishList() {
  return (
    <div>
        <Header />
        
        <div className='cardContainer'>
          <h2>Your Personal Wish List </h2>

          <Card 
            poster={HP1}
            name="Harry Potter 1"
            genre="Fantasy/Teen/Adventure"
            year="2002"/>

          <Card
            poster={HP2}
            name="Harry Potter 2"
            genre="Fantasy/Teen/Adventure"
            year="2004"/>
        </div>
    </div>
  );
}

export default WishList;