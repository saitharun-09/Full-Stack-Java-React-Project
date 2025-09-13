import '../App.css'
import Card from './Card.jsx';
import HP1 from '../Assets/download.jpeg';
import HP2 from '../Assets/download (1).jpeg';
import HP3 from '../Assets/download (2).jpeg';
import HP4 from '../Assets/download (3).jpeg';
import HP5 from '../Assets/download (4).jpeg';
import HP6 from '../Assets/download (5).jpeg';
import HP7 from '../Assets/download (6).jpeg';
import HP8 from '../Assets/download (7).jpeg';
import Header from "./Header";

function HomePage() {
    return (
        <>
        <Header />
            <div className="cardContainer">
            <h3 className='moviesHeading'>Top Recommended Movies</h3>

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
            
            <Card
                poster={HP3}
                name="Harry Potter 3"
                genre="Fantasy/Teen/Adventure"
                year="2007"/>
            
            <Card
                poster={HP4}
                name="Harry Potter 4"
                genre="Fantasy/Teen/Adventure"
                year="2008"/>
            
            <Card
                poster={HP5}
                name="Harry Potter 5"
                genre="Fantasy/Teen/Adventure"
                year="2009"/>

            <Card
                poster={HP6}
                name="Harry Potter 6"
                genre="Fantasy/Teen/Adventure"
                year="2010"/>
            
            <Card
                poster={HP7}
                name="Harry Potter 7"
                genre="Fantasy/Teen/Adventure"
                year="2011"/>
                
            <Card
                poster={HP8}
                name="Harry Potter 8"
                genre="Fantasy/Teen/Adventure"
                year="2012"/>
        </div>
        </>
    );
}

export default HomePage;