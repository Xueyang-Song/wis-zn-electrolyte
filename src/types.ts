export type Formulation = {
  formulation_id: string;
  source_id: string;
  reference_key: string;
  year: number;
  co_solvent_name: string;
  smiles: string;
  salt_name: string;
  salt_molality: number;
  co_solvent_fraction_vol_pct: number;
  lifespan_h: number;
  ionic_conductivity_mS_cm: number;
  ce_pct: number;
  esw_v: number;
  DN: number;
  AN: number;
  LogP: number;
  TPSA: number;
  MolWt: number;
  viscosity_cP: number;
  dielectric_constant: number;
  boiling_point_c: number;
  extraction_status: string;
  confidence_note: string;
};

export type SourceRow = {
  source_id: string;
  reference_key: string;
  year: number;
  title: string;
  journal: string;
  open_access_url: string;
  open_access: string;
  source_type: string;
  extraction_status: string;
  confidence_note: string;
};

export type ReferenceEntry = {
  key: string;
  text: string;
};
