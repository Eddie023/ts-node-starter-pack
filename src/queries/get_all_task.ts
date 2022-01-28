export const GET_ALL_TASKS = `
SELECT
  pt.id,
  pt.title,
  pt.status,
  pt.created_at,
  (
    SELECT json_agg(subTask)
    FROM
      (
        SELECT st.id, st.title, st.status, st.created_at
        FROM task st
        WHERE st.parent_task_id = pt.id
      ) subTask
  ) AS subtask
FROM task pt
WHERE is_subtask = false
ORDER BY pt.created_at
`;
