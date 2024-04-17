import {
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import * as icon from '@coreui/icons';
import CIcon from "@coreui/icons-react";

export default function UserTable() {
  const tableExample = [
    {
      avatar: { status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: icon.cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: icon.cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: icon.cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: icon.cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: {  status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: icon.cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: icon.cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: {  status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: icon.cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: icon.cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: {  status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: icon.cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: icon.cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: {  status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: icon.cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: icon.cibCcAmex },
      activity: 'Last week',
    },
  ]
  
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={icon.cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            Country
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            Payment Method
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {tableExample.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell className="text-center">
              <CAvatar size="md" status={item.avatar.status} ><CIcon icon={icon.cilUser}></CIcon></CAvatar>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.name}</div>
              <div className="small text-body-secondary text-nowrap">
                <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                {item.user.registered}
              </div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
            </CTableDataCell>
            <CTableDataCell>
              <div className="d-flex justify-content-between text-nowrap">
                <div className="fw-semibold">{item.usage.value}%</div>
                <div className="ms-3">
                  <small className="text-body-secondary">{item.usage.period}</small>
                </div>
              </div>
              <CProgress thin color={item.usage.color} value={item.usage.value} />
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CIcon size="xl" icon={item.payment.icon} />
            </CTableDataCell>
            <CTableDataCell>
              <div className="small text-body-secondary text-nowrap">Last login</div>
              <div className="fw-semibold text-nowrap">{item.activity}</div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
}