const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ✅ Fetch all topics
export const fetchExistingData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const data = await res.json();
    return Array.isArray(data.record)
      ? data.record.filter(item => item?.topic)
      : [];
  } catch (err) {
    console.error("❌ Error fetching JSONBin data:", err);
    return [];
  }
};

// ✅ Save topics back
export const saveData = async (array) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify(array)
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Error saving to JSONBin:", err);
    return null;
  }
};
