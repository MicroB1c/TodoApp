import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [invoices, setInvoices] = useState([]);
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('/api/invoices');
      setInvoices(res.data);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/invoices', { amount, dueDate, status });
      fetchInvoices();
      setAmount('');
      setDueDate('');
      setStatus('');
    } catch (error) {
      console.error('Failed to add invoice:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/invoices`, { params: { id } });
      fetchInvoices();
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Laskujen Hallinta</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="amount" style={styles.label}>Summa</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              placeholder="Syötä summa"
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate" style={styles.label}>Eräpäivä</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="status" style={styles.label}>Tila</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={styles.input}
              placeholder="Syötä tila"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
          >
            Lisää
          </button>
        </form>
        <ul style={styles.list}>
          {invoices.map((invoice) => (
            <li key={invoice.id} style={styles.listItem}>
              <div>
                <p style={styles.invoiceText}>Summa: <span style={styles.invoiceValue}>{invoice.amount}</span></p>
                <p style={styles.invoiceText}>Eräpäivä: {new Date(invoice.dueDate).toLocaleDateString('fi-FI')}</p>
                <p style={styles.invoiceText}>Tila: {invoice.status}</p>
              </div>
              <button
                onClick={() => handleDelete(invoice.id)}
                style={styles.deleteButton}
              >
                Poista
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
  },
  card: {
    maxWidth: '32rem',
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '0.5rem',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.5rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    focus: {
      outline: 'none',
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.3)',
    },
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none',
    hover: {
      backgroundColor: '#1d4ed8',
    },
    focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.3)',
    },
  },
  list: {
    marginTop: '2rem',
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  invoiceText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  invoiceValue: {
    color: '#4b5563',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc2626',
    color: '#fff',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none',
    hover: {
      backgroundColor: '#b91c1c',
    },
    focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.3)',
    },
  },
};
