import "./InfoCard.css";

interface Props{
  title:string;
  subtitle:string;
  className?:string;
  onClick?:()=>void;
}

export default function InfoCard({
  title,
  subtitle,
  className,
  onClick
}:Props){

  return(
    <div
      className={`e-card info-card ${className}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}
