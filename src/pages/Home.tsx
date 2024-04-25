import landingImage from '../assets/landing.png';
import appDownload from '../assets/appDownload.png';

const Home = () => {
 return (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col gap-5 text-center bg-white rounded-lg shadow-md py-8 -mt-16">
      <h1 className="text-5xl font-bold tracking-tighter text-orange-600">Tucking into a takeway today</h1>
      <span className="text-xl">Your Food is just a click away</span>
    </div>
    
    {/* App Download */}
    <div className="grid md:grid-cols-2 gap-5">
      <img src={landingImage} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <span className="font-bold text-3xl tracking-tighter">Order takeway even faster!</span>
        <span>Download the <span className="text-orange-600 text-lg">FoodJagat.com</span> App for faster ordering  and prosonalised recommendations</span>
        <img src={appDownload} />
      </div>
    </div>
  </div>
 )
}

export default Home;