import getUserBalance from '@/app/actions/getUserBalance';
import { addCommas } from '@/lib/utils';

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div className="balance">
      <h4>Your Balance</h4>
      <h3>Rs{addCommas(Number(balance?.toFixed(2) ?? 0))}</h3>
    </div>
  );
};

export default Balance;
