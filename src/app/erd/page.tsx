"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const TABLES = {
  users: {
    label: "users",
    x: 40,
    y: 60,
    columns: [
      { name: "user_id", type: "uuid", key: "PK" },
      { name: "email", type: "varchar(255)", key: "UK" },
      { name: "password_hash", type: "varchar(255)" },
      { name: "first_name", type: "varchar(100)" },
      { name: "last_name", type: "varchar(100)" },
      { name: "pronouns", type: "varchar(50)" },
      { name: "affiliation", type: "varchar(255)" },
      { name: "biography", type: "text" },
      { name: "roles", type: "user_role[]" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  user_roles: {
    label: "user_roles",
    x: 420,
    y: 60,
    columns: [
      { name: "user_role_id", type: "uuid", key: "PK" },
      { name: "user_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "role_id", type: "uuid", key: "FK", ref: "roles.role_id" },
      { name: "assigned_by", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  roles: {
    label: "roles",
    x: 810,
    y: 60,
    columns: [
      { name: "role_id", type: "uuid", key: "PK" },
      { name: "name", type: "varchar(100)", key: "UK" },
      { name: "description", type: "text" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  permissions: {
    label: "permissions",
    x: 1200,
    y: 60,
    columns: [
      { name: "permission_id", type: "uuid", key: "PK" },
      { name: "role_id", type: "uuid", key: "FK", ref: "roles.role_id" },
      { name: "action", type: "varchar(100)" },
      { name: "resource", type: "varchar(100)" },
      { name: "conditions", type: "jsonb" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  submissions: {
    label: "submissions",
    x: 420,
    y: 320,
    columns: [
      { name: "submission_id", type: "uuid", key: "PK" },
      { name: "title", type: "varchar(500)" },
      { name: "abstract", type: "text" },
      { name: "keywords", type: "text[]" },
      { name: "status", type: "submission_status" },
      { name: "archived", type: "boolean" },
      { name: "review_round", type: "integer" },
      { name: "content_type", type: "content_type" },
      { name: "current_version", type: "integer" },
      { name: "author_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  files: {
    label: "files",
    x: 810,
    y: 320,
    columns: [
      { name: "file_id", type: "uuid", key: "PK" },
      {
        name: "submission_id",
        type: "uuid",
        key: "FK",
        ref: "submissions.submission_id",
      },
      { name: "uploaded_by", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "filename", type: "varchar(500)" },
      { name: "storage_key", type: "varchar(1000)", key: "UK" },
      { name: "mime_type", type: "varchar(100)" },
      { name: "version", type: "integer" },
      { name: "label", type: "varchar(255)" },
      { name: "category", type: "file_category" },
      { name: "uploaded_at", type: "timestamptz" },
    ],
  },
  reviewer_assignments: {
    label: "reviewer_assignments",
    x: 420,
    y: 700,
    columns: [
      { name: "reviewer_assignment_id", type: "uuid", key: "PK" },
      {
        name: "submission_id",
        type: "uuid",
        key: "FK",
        ref: "submissions.submission_id",
      },
      { name: "reviewer_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "assigned_by", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "review_round", type: "integer" },
      { name: "is_active", type: "boolean" },
      { name: "invitation_message", type: "text" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  reviews: {
    label: "reviews",
    x: 810,
    y: 620,
    columns: [
      { name: "review_id", type: "uuid", key: "PK" },
      {
        name: "reviewer_assignment_id",
        type: "uuid",
        key: "FK",
        ref: "reviewer_assignments.reviewer_assignment_id",
      },
      { name: "review_round", type: "integer" },
      {
        name: "review_recommendation_id",
        type: "uuid",
        key: "FK",
        ref: "review_recommendations.review_recommendation_id",
      },
      {
        name: "review_status_id",
        type: "uuid",
        key: "FK",
        ref: "review_statuses.review_status_id",
      },
      { name: "comments_to_editor", type: "text" },
      { name: "comments_to_author", type: "text" },
      { name: "file", type: "uuid", key: "FK", ref: "files.file_id" },
      { name: "released_to_author", type: "boolean" },
      { name: "released_at", type: "timestamptz" },
      { name: "released_by", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "editor_modified_comments", type: "text" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  review_recommendations: {
    label: "review_recommendations",
    x: 1200,
    y: 620,
    columns: [
      { name: "review_recommendation_id", type: "uuid", key: "PK" },
      { name: "recommendation", type: "varchar(100)", key: "UK" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  review_statuses: {
    label: "review_statuses",
    x: 1200,
    y: 860,
    columns: [
      { name: "review_status_id", type: "uuid", key: "PK" },
      { name: "status", type: "varchar(100)", key: "UK" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  copy_editor_assignments: {
    label: "copy_editor_assignments",
    x: 420,
    y: 1000,
    columns: [
      { name: "copy_editor_assignment_id", type: "uuid", key: "PK" },
      {
        name: "submission_id",
        type: "uuid",
        key: "FK",
        ref: "submissions.submission_id",
      },
      { name: "copy_editor_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "assigned_by", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "round", type: "integer" },
      { name: "invitation_message", type: "text" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
  },
  activity_log: {
    label: "activity_log",
    x: 810,
    y: 1040,
    columns: [
      { name: "activity_log_id", type: "uuid", key: "PK" },
      {
        name: "submission_id",
        type: "uuid",
        key: "FK",
        ref: "submissions.submission_id",
      },
      {
        name: "review_assignment_id",
        type: "uuid",
        key: "FK",
        ref: "reviewer_assignments.reviewer_assignment_id",
      },
      { name: "review_id", type: "uuid", key: "FK", ref: "reviews.review_id" },
      {
        name: "copy_editor_assignment_id",
        type: "uuid",
        key: "FK",
        ref: "copy_editor_assignments.copy_editor_assignment_id",
      },
      { name: "user_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "activity_type", type: "activity_type" },
      { name: "description", type: "text" },
      { name: "actor_id", type: "uuid", key: "FK", ref: "users.user_id" },
      { name: "file_id", type: "uuid", key: "FK", ref: "files.file_id" },
      { name: "metadata", type: "jsonb" },
      { name: "created_at", type: "timestamptz" },
    ],
  },
};

type TableName = keyof typeof TABLES;
type Position = { x: number; y: number };
type Positions = Record<TableName, Position>;

const TABLE_WIDTH = 295;
const HEADER_H = 34;
const ROW_H = 24;

const PALETTE = [
  "#f97316",
  "#06b6d4",
  "#a855f7",
  "#22c55e",
  "#f43f5e",
  "#eab308",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
  "#ef4444",
  "#6366f1",
  "#10b981",
  "#d946ef",
  "#f59e0b",
  "#0ea5e9",
  "#84cc16",
  "#e11d48",
  "#7c3aed",
  "#059669",
];

function getColumnY(tablePos: Position, colIndex: number) {
  return tablePos.y + HEADER_H + colIndex * ROW_H + ROW_H / 2;
}

interface Edge {
  id: string;
  fromTable: string;
  fromCol: string;
  toTable: string;
  toCol: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

function buildEdges(positions: Positions): Edge[] {
  const edges: Edge[] = [];
  let colorIdx = 0;
  for (const tName of Object.keys(TABLES) as TableName[]) {
    const table = TABLES[tName];
    for (let ci = 0; ci < table.columns.length; ci++) {
      const col = table.columns[ci];
      if (col.key === "FK" && "ref" in col && col.ref) {
        const [refTable, refCol] = col.ref.split(".");
        if (!TABLES[refTable as TableName]) continue;
        const refColIdx = TABLES[refTable as TableName].columns.findIndex(
          (c) => c.name === refCol,
        );
        if (refColIdx === -1) continue;
        const fromPos = positions[tName];
        const toPos = positions[refTable as TableName];
        const fromY = getColumnY(fromPos, ci);
        const toY = getColumnY(toPos, refColIdx);
        const fromCX = fromPos.x + TABLE_WIDTH / 2;
        const toCX = toPos.x + TABLE_WIDTH / 2;
        let fromX: number, toX: number;
        if (fromCX > toCX) {
          fromX = fromPos.x;
          toX = toPos.x + TABLE_WIDTH;
        } else if (fromCX < toCX) {
          fromX = fromPos.x + TABLE_WIDTH;
          toX = toPos.x;
        } else {
          fromX = fromPos.x + TABLE_WIDTH;
          toX = toPos.x + TABLE_WIDTH;
        }
        edges.push({
          id: `${tName}.${col.name}->${refTable}.${refCol}`,
          fromTable: tName,
          fromCol: col.name,
          toTable: refTable,
          toCol: refCol,
          x1: fromX,
          y1: fromY,
          x2: toX,
          y2: toY,
          color: PALETTE[colorIdx % PALETTE.length],
        });
        colorIdx++;
      }
    }
  }
  return edges;
}

function TableCard({
  name,
  table,
  pos,
  onMouseDown,
  highlighted,
  onHover,
}: {
  name: string;
  table: (typeof TABLES)[TableName];
  pos: Position;
  onMouseDown: (e: React.MouseEvent, name: string) => void;
  highlighted: Set<string>;
  onHover: (name: string | null) => void;
}) {
  const isHighlighted = highlighted.has(name);
  const dimmed = highlighted.size > 0 && !isHighlighted;
  const tableH = HEADER_H + table.columns.length * ROW_H;
  return (
    <g
      transform={`translate(${pos.x}, ${pos.y})`}
      onMouseDown={(e) => onMouseDown(e, name)}
      style={{ cursor: "grab" }}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      <rect
        width={TABLE_WIDTH}
        height={tableH}
        rx={5}
        ry={5}
        fill={dimmed ? "#0f0f14" : "#14141c"}
        stroke={isHighlighted ? "#6366f1" : "#252530"}
        strokeWidth={isHighlighted ? 1.5 : 1}
        opacity={dimmed ? 0.3 : 1}
      />
      <rect
        width={TABLE_WIDTH}
        height={HEADER_H}
        rx={5}
        ry={5}
        fill={dimmed ? "#141420" : "#1c1c2c"}
        opacity={dimmed ? 0.3 : 1}
      />
      <rect
        y={HEADER_H - 5}
        width={TABLE_WIDTH}
        height={5}
        fill={dimmed ? "#141420" : "#1c1c2c"}
        opacity={dimmed ? 0.3 : 1}
      />
      <text
        x={14}
        y={22}
        fill={dimmed ? "#3a3a4a" : "#e8e8f4"}
        fontSize={13}
        fontWeight={700}
        fontFamily="monospace"
        opacity={dimmed ? 0.3 : 1}
      >
        {table.label}
      </text>
      <text
        x={TABLE_WIDTH - 10}
        y={22}
        fill={dimmed ? "#2a2a3a" : "#4a4a5a"}
        fontSize={10}
        fontFamily="monospace"
        textAnchor="end"
        opacity={dimmed ? 0.3 : 1}
      >
        {table.columns.length} cols
      </text>
      {table.columns.map((col, i) => {
        const y = HEADER_H + i * ROW_H;
        const isEven = i % 2 === 0;
        return (
          <g key={col.name} opacity={dimmed ? 0.3 : 1}>
            {isEven && (
              <rect
                y={y}
                width={TABLE_WIDTH}
                height={ROW_H}
                fill="rgba(255,255,255,0.012)"
              />
            )}
            {col.key === "PK" && (
              <text
                x={10}
                y={y + 16}
                fill="#f59e0b"
                fontSize={8.5}
                fontFamily="monospace"
                fontWeight={700}
              >
                PK
              </text>
            )}
            {col.key === "FK" && (
              <text
                x={10}
                y={y + 16}
                fill="#60a5fa"
                fontSize={8.5}
                fontFamily="monospace"
                fontWeight={700}
              >
                FK
              </text>
            )}
            {col.key === "UK" && (
              <text
                x={10}
                y={y + 16}
                fill="#a78bfa"
                fontSize={8.5}
                fontFamily="monospace"
                fontWeight={700}
              >
                UK
              </text>
            )}
            <text
              x={34}
              y={y + 16}
              fill={col.key === "FK" ? "#93c5fd" : "#a8a8b8"}
              fontSize={11}
              fontFamily="monospace"
            >
              {col.name}
            </text>
            <text
              x={TABLE_WIDTH - 10}
              y={y + 16}
              fill="#484858"
              fontSize={10}
              fontFamily="monospace"
              textAnchor="end"
            >
              {col.type}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function ERDPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<Positions>(() => {
    const p = {} as Positions;
    for (const [k, v] of Object.entries(TABLES))
      p[k as TableName] = { x: v.x, y: v.y };
    return p;
  });
  const [dragging, setDragging] = useState<{
    name: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(0.9);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const edges = buildEdges(positions);
  const highlighted = new Set<string>();
  if (hoveredTable) {
    highlighted.add(hoveredTable);
    for (const e of edges) {
      if (e.fromTable === hoveredTable || e.toTable === hoveredTable) {
        highlighted.add(e.fromTable);
        highlighted.add(e.toTable);
      }
    }
  }

  const onTableMouseDown = useCallback(
    (e: React.MouseEvent, name: string) => {
      e.stopPropagation();
      const r = svgRef.current!.getBoundingClientRect();
      setDragging({
        name,
        offsetX:
          (e.clientX - r.left) / scale -
          pan.x / scale -
          positions[name as TableName].x,
        offsetY:
          (e.clientY - r.top) / scale -
          pan.y / scale -
          positions[name as TableName].y,
      });
    },
    [positions, scale, pan],
  );

  const onBgMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsPanning(true);
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    },
    [pan],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging) {
        const r = svgRef.current!.getBoundingClientRect();
        setPositions((prev) => ({
          ...prev,
          [dragging.name]: {
            x: (e.clientX - r.left) / scale - pan.x / scale - dragging.offsetX,
            y: (e.clientY - r.top) / scale - pan.y / scale - dragging.offsetY,
          },
        }));
      } else if (isPanning && panStart.current) {
        setPan({
          x: e.clientX - panStart.current.x,
          y: e.clientY - panStart.current.y,
        });
      }
    };
    const onUp = () => {
      setDragging(null);
      setIsPanning(false);
      panStart.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, isPanning, scale, pan]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(2.5, Math.max(0.2, s - e.deltaY * 0.001)));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        background: "#0a0a0e",
        overflow: "hidden",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          padding: "10px 20px",
          background: "#0e0e14",
          borderBottom: "1px solid #1a1a24",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span
            style={{
              color: "#e0e0ec",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}
          >
            capacious_erd
          </span>
          <span style={{ color: "#3a3a4a", fontSize: 11 }}>
            12 tables · revised schema
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              fontSize: 9,
              color: "#f59e0b",
              border: "1px solid #f59e0b30",
              padding: "2px 7px",
              borderRadius: 3,
            }}
          >
            PK
          </span>
          <span
            style={{
              fontSize: 9,
              color: "#60a5fa",
              border: "1px solid #60a5fa30",
              padding: "2px 7px",
              borderRadius: 3,
            }}
          >
            FK
          </span>
          <span
            style={{
              fontSize: 9,
              color: "#a78bfa",
              border: "1px solid #a78bfa30",
              padding: "2px 7px",
              borderRadius: 3,
            }}
          >
            UK
          </span>
          <span style={{ color: "#2a2a3a", margin: "0 4px" }}>|</span>
          <span style={{ fontSize: 10, color: "#3a3a4a" }}>
            drag tables · scroll zoom · drag bg pan · hover highlight
          </span>
        </div>
      </div>
      <svg
        ref={svgRef}
        width="100%"
        height="calc(100% - 40px)"
        style={{
          cursor: isPanning ? "grabbing" : dragging ? "grabbing" : "default",
        }}
        onMouseDown={onBgMouseDown}
        onWheel={onWheel}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
          {edges.map((e) => {
            const isActive =
              hoveredTable &&
              (e.fromTable === hoveredTable || e.toTable === hoveredTable);
            const dimmed = hoveredTable && !isActive;
            const dx = e.x2 - e.x1;
            const cp = Math.min(Math.abs(dx) * 0.45, 90);
            const d = `M ${e.x1} ${e.y1} C ${e.x1 + (dx > 0 ? cp : -cp)} ${e.y1}, ${e.x2 + (dx > 0 ? -cp : cp)} ${e.y2}, ${e.x2} ${e.y2}`;
            return (
              <g key={e.id} opacity={dimmed ? 0.06 : isActive ? 1 : 0.3}>
                <path
                  d={d}
                  fill="none"
                  stroke={e.color}
                  strokeWidth={isActive ? 2 : 1.2}
                />
                <circle
                  cx={e.x1}
                  cy={e.y1}
                  r={isActive ? 3.5 : 2.5}
                  fill={e.color}
                />
                <circle
                  cx={e.x2}
                  cy={e.y2}
                  r={isActive ? 3.5 : 2.5}
                  fill={e.color}
                />
              </g>
            );
          })}
          {Object.entries(TABLES).map(([name, table]) => (
            <TableCard
              key={name}
              name={name}
              table={table}
              pos={positions[name as TableName]}
              onMouseDown={onTableMouseDown}
              highlighted={highlighted}
              onHover={setHoveredTable}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
