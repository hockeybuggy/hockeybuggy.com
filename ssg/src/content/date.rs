use anyhow::{Context, Result};
use chrono::{DateTime, FixedOffset, NaiveDate};

pub(super) fn parse_date(s: &str) -> Result<NaiveDate> {
    if s.contains('T') {
        let dt = DateTime::<FixedOffset>::parse_from_rfc3339(s)
            .with_context(|| format!("RFC3339 parse failed for '{s}'"))?;
        Ok(dt.with_timezone(&chrono::Utc).date_naive())
    } else {
        NaiveDate::parse_from_str(s, "%Y-%m-%d")
            .with_context(|| format!("Date parse failed for '{s}'"))
    }
}
