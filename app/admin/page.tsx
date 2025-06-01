import styles from './admin.module.css';

export default function AdminPage() {
  return (
    <section className={styles.adminPage}>
      <h1>後台管理</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>日期</th>
            <th>品項</th>
            <th>數量</th>
            <th>上傳者</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024/06/01</td>
            <td>麵包</td>
            <td>3</td>
            <td>user01</td>
            <td><button className={styles.deleteBtn}>刪除</button></td>
          </tr>
          <tr>
            <td>2024/05/28</td>
            <td>蔬菜</td>
            <td>2</td>
            <td>user02</td>
            <td><button className={styles.deleteBtn}>刪除</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
} 