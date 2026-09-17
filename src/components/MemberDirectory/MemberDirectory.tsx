import { useMemo, useState } from "react";
import type { Member } from "../../types/domain";
import MemberRow from "../MemberRow/MemberRow";
import "./MemberDirectory.css";

type MemberDirectoryProps = {
  members: Member[];
  onSelectMember: (memberId: number) => void;
};

function normalizeSearch(value: string): string {
  return value.trim().replace(/^#/, "").toLocaleLowerCase("sv-SE");
}

function MemberDirectory({ members, onSelectMember }: MemberDirectoryProps) {
  const [query, setQuery] = useState("");

  const visibleMembers = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return members
      .filter((member) => member.active)
      .filter((member) => {
        if (!normalizedQuery) {
          return true;
        }

        return (
          String(member.id).includes(normalizedQuery) ||
          member.nickname.toLocaleLowerCase("sv-SE").includes(normalizedQuery)
        );
      });
  }, [members, query]);

  return (
    <section
      className="dashboard-panel"
      aria-labelledby="member-directory-title"
    >
      <div className="dashboard-panel__heading member-directory__heading">
        <div>
          <p className="dashboard-panel__eyebrow">Hitta rätt person</p>
          <h2 id="member-directory-title">Medlemmar</h2>
        </div>

        <span className="member-directory__count">
          {visibleMembers.length} av{" "}
          {members.filter((member) => member.active).length}
        </span>
      </div>

      <label className="member-directory__search">
        <span>Sök medlem</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Smeknamn eller medlemsnummer"
        />
      </label>

      {visibleMembers.length > 0 ? (
        <ul className="member-directory__list">
          {visibleMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onSelect={(): void => onSelectMember(member.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="member-directory__empty">
          Ingen medlem matchar sökningen.
        </p>
      )}
    </section>
  );
}

export default MemberDirectory;
