import { useEffect, useState } from "react";
import { getCharacters, patchCharacter } from "../api";
import type { Character } from "../components/utils";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharacters().then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  const handleToggle = async (id: number, enabled: boolean) => {
    const updated = await patchCharacter(id, { isEnabled: enabled });
    setCharacters((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const nightRoles = characters.filter((c) => c.nightOrder !== null);
  const dayRoles = characters.filter((c) => c.nightOrder === null);
  const enabledCount = characters.filter(
    (c) => c.isEnabled && c.nightOrder !== null,
  ).length;

  return {
    characters,
    loading,
    nightRoles,
    dayRoles,
    enabledCount,
    handleToggle,
  };
}
