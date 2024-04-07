import './UserExpectedPay.scss';

export const UserExpectedPay = ({
    userId,
    userExpectedPay,
}: {
    userId: number;
    userExpectedPay: number;
}) => {
    const shouldPay = userExpectedPay >= 0;
    const valueToShow = shouldPay ? userExpectedPay : userExpectedPay * -1;
    const moneyToPayTitle = shouldPay ? 'Paga: ' : 'Recibe: ';

    return (
        <div className={`user-expected-pay ${userId}`}>
            <p className="user-expected-pay-title">{moneyToPayTitle}</p>
            <p
                className={`user-expected-pay-amount ${
                    shouldPay ? 'should-pay' : 'should-recieve'
                }`}>
                {valueToShow}
            </p>
        </div>
    );
};
