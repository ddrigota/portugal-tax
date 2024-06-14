import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Disclaimer = () => {
  return (
    <Card className="col-start-2 row-start-3 opacity-70">
      <CardHeader>
        <CardTitle>Disclaimer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-pretty text-sm">
        <p>
          This is a simple tax calculator. It is not a substitute for
          professional tax advice. Please consult a tax professional.
        </p>
        <p>
          The calculator is provided for general information purposes only. The
          results are estimates and do not constitute financial advice. We do
          not guarantee the accuracy of the results. Please seek professional
          advice before making any financial decisions.
        </p>
      </CardContent>
    </Card>
  );
};

export default Disclaimer;
