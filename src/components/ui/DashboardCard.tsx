/** @deprecated Use Card from './Card' instead */
import Card, { type CardProps } from "./Card";

function DashboardCard(props: CardProps) {
  return <Card {...props} />;
}

export default DashboardCard;
