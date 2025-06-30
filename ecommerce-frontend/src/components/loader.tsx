

const Loader = () => {
//  return (
//     <div style={{ width: '100%', maxWidth: '100vh', margin: '0 auto' }}>
//       <video
//         width="100%"
//         controls
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="videos/17510993645490kqorxjs.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
return(
  <div>
    Loading
  </div>
)
}

export default Loader;

interface SkeletonProps{
  width?:string;
  length?:number;
}

export const Skeleton = ({
  width="unset",
  length = 3,
} : SkeletonProps) => {

  const skeletons = Array.from({length}, (_, idx) => (
    <div key={idx} className="skeleton-shape">
    </div>
    ))

  return <div className="skeleton-loader" style={{width}}>
    {skeletons}
  </div>
}
