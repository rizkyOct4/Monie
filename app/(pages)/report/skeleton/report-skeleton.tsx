import { Skeleton } from "@/components/ui/skeleton";

type TReportSkeleton = {
  type:
    | "salaryRemaining"
    | "expensePercentage"
    | "totaltransactions"
    | "biggestExpense"
    | "averageExpense"
    | "mostExpensiveDay"
    | "percentage";
};

export const ReportSkeleton = ({type}: TReportSkeleton) => {
  switch (type) {
    case "salaryRemaining":
    case "expensePercentage": {
      return (
        <>
          <Skeleton className="ml-auto h-5 w-14" />
          <Skeleton className="mt-2 ml-auto h-3 w-24" />
        </>
      );
    }
    case "totaltransactions":
    case "biggestExpense":
    case "averageExpense":
    case "mostExpensiveDay": {
      return <Skeleton className="h-6 w-12" />;
    }
    case "percentage": {
      return <Skeleton className="h-full w-full rounded-full" />;
    }
    default:
      return null;
  }
};
