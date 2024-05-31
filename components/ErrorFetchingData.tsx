export default function ErrorFetchingData({name}:{name:string}) {
  return (
      <div className={"flex flex-col items-center justify-center"}>
        <h1 className='font-extrabold text-xl'>Oups..</h1>
        <h1 className='font-extrabold text-xl'>Error with fetching data from : {name}</h1>
      </div>
  );
}
