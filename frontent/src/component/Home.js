import Notes from './Notes';

function Home(props) {
  const {showAlert}=props
  return (
    <div >
      {/* <AddNote /> */}
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home